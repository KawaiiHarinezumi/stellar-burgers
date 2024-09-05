import { expect, test, describe, jest } from '@jest/globals';
import {
    orderInfoReducer,
    initialState
} from '../services/orderInfo/slice';
import { getOrderInfoByNumber } from '../services/orderInfo/actions';

const order = [
    {
        _id: "66d76e99119d45001b503f03",
        status: "done",
        owner: "66cf5285119d45001b5029fa",
        name: "Флюоресцентный space фалленианский альфа-сахаридный люминесцентный бургер",
        createdAt: "2024-09-03T20:16:25.113Z",
        updatedAt: "2024-09-03T20:16:25.608Z",
        number: 51926,
        ingredients: [ ]
    },
];

describe('orderInfo', () => {
    test('', () => {
        const action = { type: getOrderInfoByNumber.pending.type };
        const newState = orderInfoReducer(
            initialState,
            action
        );

        expect(newState.orderInfoData).toEqual(null);
    });

    test('', () => {
        const action = { type: getOrderInfoByNumber.fulfilled.type, payload: {orders: [order]} };
        const newState = orderInfoReducer(
            initialState,
            action
        );
        expect(newState.orderInfoData).toEqual(order);
    });
});