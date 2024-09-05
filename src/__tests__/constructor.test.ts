import { expect, test, describe } from '@jest/globals';
import {
    constructorReducer,
    initialState,
    addConstructorItem,
    removeConstructorItem,
    moveConstructorItemUp,
    moveConstructorItemDown,
    clearConstructorItems,
    TConstructorState
} from '../services/constructor/slice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'uuid')
}));

const bun: TConstructorIngredient = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    id: '1'
};

const ingredient: TIngredient = {
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
};


const ingredients : TConstructorIngredient[] = [
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
        id: '2'
    },
    {
        _id: "643d69a5c3f7b9001cfa0942",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        id: '5'
    }
];

describe('burgerConstructor', () => {
    test('добавление булки addConstructorItem', () => {
        const newState = constructorReducer(
            initialState,
            addConstructorItem({...bun})
        );
        expect(newState.constructorItems.bun?._id).toEqual(bun._id);
    });

    test('добавление ингредиентов addConstructorItem', () => {
        const initialState : TConstructorState = { constructorItems: {
            bun: bun,
            ingredients: ingredients
          }
        };
        const newState = constructorReducer(
            initialState,
            addConstructorItem({...ingredient, id: "new"})
        );
        expect(newState.constructorItems.ingredients).toHaveLength(ingredients.length+1);
        expect(newState.constructorItems.ingredients[ingredients.length]).toEqual({...ingredient, id: 'new'});
    });

    test('удаление ингредиента removeConstructorItem', () => {
        const initialState : TConstructorState = { constructorItems: {
            bun: bun,
            ingredients: ingredients
          }
        };
        const newState = constructorReducer(
            initialState,
            removeConstructorItem(ingredients[0])
        );
        expect(newState.constructorItems.ingredients).toHaveLength(ingredients.length-1);
        expect(newState.constructorItems.ingredients[0]).toEqual(ingredients[1]);
    });

    test('перемещение ингредиента вверх moveConstructorItemUp', () => {
        const initialState : TConstructorState = { constructorItems: {
            bun: bun,
            ingredients: ingredients
          }
        };
        const newState = constructorReducer(
            initialState,
            moveConstructorItemUp(1)
        );
        expect(newState.constructorItems.ingredients).toHaveLength(ingredients.length);
        expect(newState.constructorItems.ingredients[0]).toEqual(ingredients[1]);
        expect(newState.constructorItems.ingredients[1]).toEqual(ingredients[0]);
    });

    test('перемещение ингредиента вниз moveConstructorItemDown', () => {
        const initialState : TConstructorState = { constructorItems: {
            bun: bun,
            ingredients: ingredients
          }
        };
        const newState = constructorReducer(
            initialState,
            moveConstructorItemDown(0)
        );
        expect(newState.constructorItems.ingredients).toHaveLength(ingredients.length);
        expect(newState.constructorItems.ingredients[0]).toEqual(ingredients[1]);
        expect(newState.constructorItems.ingredients[1]).toEqual(ingredients[0]);
    });

    test('очистка clearConstructor', () => {
        const newState = constructorReducer(
            initialState,
            clearConstructorItems()
        );
        expect(newState.constructorItems.bun).toBeNull();
        expect(newState.constructorItems.ingredients).toHaveLength(0);
    });
});