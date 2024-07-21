import { InformationssService } from "../services/informations.service";
import { InformationsMapper } from "../mappers/Informations.mapper";

export const GetAllInformations = async (authHeader) => {

    const informationsDtoArray = await InformationssService.fetchAllInformations(authHeader);
    const InformationsModelArray = informationsDtoArray.map(dto => InformationsMapper.transformInformationDtoToModel(dto));

    return InformationsModelArray
};