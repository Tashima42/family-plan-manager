import {Payment} from "../../../entities/Payment";
import {IPaymentRepository} from "../../IPaymentRepository";
import {SqliteDatabase} from "./index";

export class SqlitePaymentRepository implements IPaymentRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async create(payment: Payment): Promise<Payment> {
    const db = await this.sqliteDatabase.connect()
    const created = await db.run(`INSERT INTO payment 
        (ammount, attachment, payment_date, due_date, user_id, group_plan_id, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      payment.getAmmount(),
      payment.getAttachment(),
      payment.getPaymentDate(),
      payment.getDueDate(),
      payment.getUserId(),
      payment.getGroupId(),
      payment.getDescription()
    )
    payment.setId(created.lastID)

    return payment
  }
  async findAllByUserId(userId: number): Promise<Array<Payment>> {
    const db = await this.sqliteDatabase.connect()

    let paymentsFound = await db.all(`SELECT
      id, ammount, attachment, payment_date, due_date, user_id, group_plan_id, description 
    FROM payment
    WHERE user_id = ?;`, userId)
    if (!paymentsFound) throw {code: "RS-IS-SE-GR-002", message: "Payments not found"}
    if (!Array.isArray(paymentsFound)) paymentsFound = [paymentsFound]

    const payments = paymentsFound.map((paymentFound: any) => {
      return new Payment(
        paymentFound.ammount,
        paymentFound.payment_date,
        paymentFound.due_date,
        paymentFound.user_id,
        paymentFound.group_plan_id,
        paymentFound.description,
        paymentFound.attachment,
        paymentFound.id,
      )
    })
    return payments;
  }
  async findAllByGroupId(groupId: number): Promise<Array<Payment>> {
    const db = await this.sqliteDatabase.connect()

    let paymentsFound = await db.all(`SELECT
      id, ammount, attachment, payment_date, due_date, user_id, group_plan_id, description 
    FROM payment
    WHERE group_plan_id = ?;`, groupId)
    if (!paymentsFound) throw {code: "RS-IS-SE-GR-002", message: "Payments not found"}
    if (!Array.isArray(paymentsFound)) paymentsFound = [paymentsFound]

    const payments = paymentsFound.map((paymentFound: any) => {
      return new Payment(
        paymentFound.ammount,
        paymentFound.payment_date,
        paymentFound.due_date,
        paymentFound.user_id,
        paymentFound.group_plan_id,
        paymentFound.description,
        paymentFound.attachment,
        paymentFound.id,
      )
    })
    return payments;
  }
}
