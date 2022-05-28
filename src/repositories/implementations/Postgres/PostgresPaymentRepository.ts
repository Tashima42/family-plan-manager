import {Payment} from "../../../entities/Payment";
import {IPaymentRepository} from "../../IPaymentRepository";
import {PostgresDatabase} from "./index";

export class PostgresPaymentRepository implements IPaymentRepository {
  constructor(private postgresDatabase: PostgresDatabase) {}

  async create(payment: Payment): Promise<Payment> {
    const {rows: [created]} = await this.postgresDatabase.client.query(`INSERT INTO payment 
        (ammount, attachment, date, user_id, group_plan_id, description) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        payment.getAmmount(),
        payment.getAttachment(),
        payment.getDate(),
        payment.getUserId(),
        payment.getGroupId(),
        payment.getDescription()
      ]
    )
    payment.setId(created.id)

    return payment
  }
  async findAllByUserId(userId: number): Promise<Array<Payment>> {

    const {rows: paymentsFound} = await this.postgresDatabase.client.query(`SELECT
      id, ammount, attachment, date, user_id, group_plan_id, description 
    FROM payment
    WHERE user_id = $1;`, [userId])
    if (!paymentsFound) throw {code: "RS-IS-SE-PT-001", message: "Payments not found"}

    const payments = paymentsFound.map((paymentFound: any) => {
      return new Payment(
        paymentFound.ammount,
        paymentFound.date,
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

    const {rows: paymentsFound} = await this.postgresDatabase.client.query(`SELECT
      id, ammount, attachment, date, user_id, group_plan_id, description 
    FROM payment
    WHERE group_plan_id = $1;`, [groupId])
    if (!paymentsFound) throw {code: "RS-IS-SE-PT-002", message: "Payments not found"}

    const payments = paymentsFound.map((paymentFound: any) => {
      return new Payment(
        paymentFound.ammount,
        paymentFound.date,
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
