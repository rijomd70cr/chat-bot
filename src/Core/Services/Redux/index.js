import { configureStore } from '@reduxjs/toolkit'
import {Modules} from "../../../Modules";
import AppRedux from "./AppRedux";
import dataTable from "../../../Components/AppDataTable/Reducer";

let reducer = {
  app: AppRedux,
  dataTable
};
let moduleSet = Object.keys(Modules);
for (let i = 0; i < moduleSet.length; i++) {
    const element = moduleSet[i];
    let md = Modules[element]?.Reducer;
    if(md) {
        let r = {[element.toLowerCase()]: md}
        reducer = {...reducer, ...r}
    }
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;