import { createStore, Store, useStore as useVuexStore } from "vuex";

import { getPageListData } from "@/service/main/system/system";

import { IRootStore, IStoreType } from "./type";

import login from "./login/login";
import system from "./main/system/system";

const store = createStore<IRootStore>({
  state() {
    return {
      name: "anzhiyu",
      age: 18,
      queryInfo: {},
      entireDepartment: [],
      entireRole: [],
    };
  },
  mutations: {
    saveQueryInfo(state, queryInfo) {
      state.queryInfo = queryInfo;
    },
    changeEntireDepartment(state, entireDepartment) {
      state.entireDepartment = entireDepartment;
    },
    changeEntireRole(state, entireRole) {
      state.entireRole = entireRole;
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000,
      });
      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = roleResult.data;

      // 2.保存数据
      commit("changeEntireDepartment", departmentList);
      commit("changeEntireRole", roleList);
    },
  },
  modules: {
    login,
    system,
  },
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
  store.dispatch("getInitialDataAction");
}

// 解决Vuex中useStore类型问题(比如：子模块中的类型不能识别)
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
