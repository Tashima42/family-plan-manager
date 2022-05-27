import {IMakePaymentRequestDTO} from "./make-payment-request-DTO";
import {IMakePaymentResponseDTO} from "./make-payment-response-DTO";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";
import {IPaymentRepository} from "../../repositories/IPaymentRepository";
import {Payment} from "../../entities/Payment";
import {IImageHelper} from "../../helpers/IImageHelper";
import {Image} from "../../entities/Image";

export class MakePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private groupPlanRepository: IGroupPlanRepository,
    private imageHelper: IImageHelper
  ) {}

  async execute(data: IMakePaymentRequestDTO): Promise<IMakePaymentResponseDTO> {
    const {authorizedUser, ammount, attachment, date, groupId, description} = data

    const userGroupPlanFound = await this.groupPlanRepository.findUserGroupPlanByUserId(authorizedUser.getId(), data.groupId)
    if (!userGroupPlanFound) {
      throw {code: "UC-MP-001", message: "User isn't in this group plan"}
    }

    let image: Image = null
    if (attachment) {
      const fileType = attachment.split("data:")[1].split(";base64,")[0]
      if (fileType.includes("image/")) {
        const cleanAttachment = attachment.split("base64,")[1]
        image = await this.imageHelper.upload(cleanAttachment)
      }
    }
    //TODO: check if attachment is base64, pdf, jpeg, jpg or png
    //TODO: treat dates
    const newPayment = new Payment(ammount, date, authorizedUser.getId(), groupId, description, image.getFullUrl())

    const payment = await this.paymentRepository.create(newPayment)

    return {payment}
  }
}
