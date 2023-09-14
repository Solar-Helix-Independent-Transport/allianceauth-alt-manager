import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";

export async function loadReport(cid) {
  if (cid !== 0) {
    console.log(`get report from api`, cid);
    const api = await axios.get(`/alts/api/get_report/${cid}`);
    return api.data;
  } else {
    return false;
  }
}

export async function loadCorps() {
  const api = await axios.get(`/alts/api/get_corps`);
  console.log(`get corps from api`);
  return api.data;
}

