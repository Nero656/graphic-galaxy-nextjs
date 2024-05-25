import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {api} from './features/api-slice'
import {auth} from './features/auth-slice'
import {order} from './features/order-slice'
import {builderCPU} from "@/redux/features/BuilderSlices/builderCPU-slice";
import {builderGPU} from './features/BuilderSlices/builderGPU-slice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import {builderRAM} from "@/redux/features/BuilderSlices/builderRAM-slice";
import {builderMotherboard} from "@/redux/features/BuilderSlices/builderMotherboard-slice";
import {builderCooling} from "@/redux/features/BuilderSlices/builderCooling-slice";
import {builderSSD} from "@/redux/features/BuilderSlices/builderSSD-slice";
import {builderPowerUnit} from "@/redux/features/BuilderSlices/builderPowerUnit-slice";
import {builderHDD} from "@/redux/features/BuilderSlices/builderHDD-slice";
import {builderCase} from "@/redux/features/BuilderSlices/builderCorpus";
const persistConfig = {
    key: 'root',
    storage,
}

const userPersistConfig = {
    key: 'user',
    storage,
}

const orderPersistConfig = {
    key: 'order',
    storage,
}

const builderCPUPersistConfig = {
    key: 'builderCPU',
    storage,
}

const builderGPUPersistConfig = {
    key: 'builderGPU',
    storage,
}

const builderRAMPersistConfig = {
    key: 'builderRAM',
    storage,
}
const builderMotherboardPersistConfig = {
    key: 'builderMotherboard',
    storage,
}

const builderCoolingConfig = {
    key: 'builderCooling',
    storage,
}

const builderSSDConfig = {
    key: 'builderSSD',
    storage,
}

const builderPowerUnitConfig = {
    key: 'builderPowerUnit',
    storage,
}

const builderHDDConfig = {
    key: 'builderHDD',
    storage,
}

const builderCaseConfig = {
    key: 'builderCorpus',
    storage,
}


const rootReducer = combineReducers({
    api: api.reducer,
    user: persistReducer(userPersistConfig, auth.reducer),
    order: persistReducer(orderPersistConfig, order.reducer),
    builderCPU: persistReducer(builderCPUPersistConfig, builderCPU.reducer),
    builderGPU: persistReducer(builderGPUPersistConfig, builderGPU.reducer),
    builderRAM: persistReducer(builderRAMPersistConfig, builderRAM.reducer),
    builderMotherboard: persistReducer(builderMotherboardPersistConfig, builderMotherboard.reducer),
    builderCooling: persistReducer(builderCoolingConfig, builderCooling.reducer),
    builderSSD: persistReducer(builderSSDConfig, builderSSD.reducer),
    builderPowerUnit: persistReducer(builderPowerUnitConfig, builderPowerUnit.reducer),
    builderHDD: persistReducer(builderHDDConfig, builderHDD.reducer),
    builderCorpus: persistReducer(builderCaseConfig, builderCase.reducer)
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector