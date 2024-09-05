import { expect, test, describe } from '@jest/globals';
import {
    ingredientsReducer,
    initialState
} from '../services/ingredients/slice';
import { getIngredients } from '../services/ingredients/actions';

const ingredient = [
    {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        id: 2
    }
]

describe('ingredients', () => {
    test('экшен на получение списка ингредиентов (pending)', async () => {
        const state = ingredientsReducer(
            initialState,
            getIngredients.pending('pending')
        );
        expect(state.isLoading).toBe(true);
    });

    test('экшен на получение списка ингредиентов (fulfilled)', async () => {
        const state = ingredientsReducer(
            initialState,
            getIngredients.fulfilled(ingredient, 'fulfilled')
        );
        expect(state.isLoading).toBe(false);
        expect(state.ingredients).toEqual(ingredient);
    });

    test('ошибка экшена на получение списка ингредиентов (rejected)', async () => {
        const error = new Error('Fetch error');
        const state = ingredientsReducer(
            initialState,
            getIngredients.rejected(error, 'rejected')
        );
        expect(state.isLoading).toBe(false);
        expect(state.ingredients).toEqual([]);
    });
});