import { YapiGetV1ImHomeColumnGetData } from "./yapi/ImHomeColumnGetListV1GetApi";
import { YapiGetV1ImHomeWebsiteGetData } from "./yapi/ImHomeWebsiteGetDataV1GetApi";

export type TlayoutProps = YapiGetV1ImHomeWebsiteGetData & Partial<YapiGetV1ImHomeColumnGetData>