import requset from "../utils/request"
export default {
  getAllMtSwiper(params) {
    return requset.post("/api/getAllMtSwiper", params);
  },
  searchMtNews: (params) => requset.post("/api/searchMtNews", params),
  wxLogin: (params) => requset.post("/api/wxLogin", params)
}