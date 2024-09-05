import { expect, test, describe } from '@jest/globals';
import {
    feedReducer//, initialState
} from '../services/feed/slice';
import { getFeed, getUserOrders } from '../services/feed/actions';

const feedData = {
    orders: [
        {
            _id: "66d76e99119d45001b503f03",
            status: "done",
            name: "Флюоресцентный space фалленианский альфа-сахаридный люминесцентный бургер",
            createdAt: "2024-09-03T20:16:25.113Z",
            updatedAt: "2024-09-03T20:16:25.608Z",
            number: 51926,
            ingredients: [ ]
        },
    ],
    total: 100,
    totalToday: 1000
};

const initialState = {
    orders: [
        {
            _id: "66d76e99119d45001b503f03",
            status: "done",
            name: "Флюоресцентный space фалленианский альфа-сахаридный люминесцентный бургер",
            createdAt: "2024-09-03T20:16:25.113Z",
            updatedAt: "2024-09-03T20:16:25.608Z",
            number: 51926,
            ingredients: [ ] 
        },
        {
            _id: "csvmdf",
            status: "done",
            name: "test",
            createdAt: "2024-09-03T20:18:25.113Z",
            updatedAt: "2024-09-03T20:20:25.608Z",
            number: 26,
            ingredients: [ ] 
        }, 
    ],
    total: 1,
    totalToday: 1,
    isLoading: false
  }

describe('feed', () => {
    test('экшен на получение списка заказов (fulfilled)', async () => {
        const action = { type: getFeed.fulfilled.type, payload: feedData };
        const state = feedReducer(
            initialState,
            action
        );
        expect(state.orders).toEqual(feedData.orders);
        expect(state.total).toEqual(feedData.total);
        expect(state.totalToday).toEqual(feedData.totalToday);
    });

    test('ошибка экшена на получение списка заказов  (rejected)', async () => {
        const error = new Error('Fetch error');
        const action = { type: getFeed.rejected.type, payload: error };        
        const state = feedReducer(
            initialState,
            action
        );        
        expect(state.orders).toEqual([]);
        expect(state.total).toEqual(0);
        expect(state.totalToday).toEqual(0);
    });

    test('экшен на получение списка заказов пользователя (pending)', async () => {
        const action = { type: getUserOrders.pending.type };        
        const state = feedReducer(
            initialState,
            action
        );
        expect(state.isLoading).toBe(true);
        expect(state.orders).toEqual(initialState.orders);
    });

    test('экшен на получение списка заказов пользователя (fulfilled)', async () => {        
        const action = { type: getUserOrders.fulfilled.type, payload: feedData.orders };
        const state = feedReducer(
            initialState,
            action
        );
        expect(state.isLoading).toBe(false);
        expect(state.orders).toEqual(feedData.orders);
    });
});