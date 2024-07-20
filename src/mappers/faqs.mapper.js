import { FaqsModel } from "../models/faqs.model";

export const FaqsMapper = {

    transformFaqsDtoToModel(faqsDto) {
        return new FaqsModel (
            faqsDto._id,
            `${faqsDto._user._firstName} ${faqsDto._user._name}`,
            faqsDto._user._role,
            faqsDto._createdAt,
            faqsDto._modifiedAt,
            faqsDto._status,
            faqsDto._question,
            faqsDto._answer
        );
    },



};