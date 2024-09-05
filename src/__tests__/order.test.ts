import { expect, test, describe } from '@jest/globals';
import {
    orderReducer,
    initialState
} from '../services/order/slice';
import { createOrder } from '../services/order/actions';


const order = [
    {
        _id: "66d76e99119d45001b503f03",
        status: "done",
        owner: "66cf5285119d45001b5029fa",
        name: "Space астероидный фалленианский краторный экзо-плантаго люминесцентный бургер",
        createdAt: "2024-09-03T20:16:25.113Z",
        updatedAt: "2024-09-03T20:16:25.608Z",
        number: 51926,
        ingredients: []
    },
];

describe('order', () => {
    test('экшен на создание заказа пользователя (pending)', async () => {
        const action = { type: createOrder.pending.type };
        const state = orderReducer(
            initialState,
            action
        );
        expect(state.orderRequest).toBe(true);
    });

    test('ошибка экшена на создание заказа пользователя (rejected)', async () => {
        const action = { type: createOrder.rejected.type };
        const state = orderReducer(
            initialState,
            action
        );
        expect(state.orderRequest).toBe(false);
    });

    test('экшен на создание заказа пользователя (fulfilled)', async () => {
        const action = { type: createOrder.fulfilled.type, payload: {order: order} };
        const state = orderReducer(
            initialState,
            action
        );
        expect(state.orderRequest).toBe(false);
        expect(state.orderModalData).toBe(order);
    });
});