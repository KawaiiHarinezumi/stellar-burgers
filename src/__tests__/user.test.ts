import {
    TAuthState,
    authReducer,
    initialState,
    getUser,
    getAuthChecked
} from '../services/auth/slice';
import {
    registerUser,
    loginUser,
    updateUser,
    logoutUser,
    checkUserAuth
} from '../services/auth/actions';

const user = {
    name: 'user',
    email: 'testuser@gmail.com',
    password: 'qwerty'
};

describe('регистрация пользователя registerUser', () => {
    let initialState: TAuthState;
  
    beforeEach(() => {
        initialState = {
            user: null,
            isAuthChecked: false
        };
    });
  
    test('registerUser (fulfilled)', () => {
        const action = { type: registerUser.fulfilled.type, payload: user };
        const state = authReducer(initialState, action);
  
        expect(state.isAuthChecked).toEqual(true);
        expect(state.user).toEqual(user);
    });
});

describe('вход пользователя loginUser', () => {
    let initialState: TAuthState;
  
    beforeEach(() => {
        initialState = {
            user: null,
            isAuthChecked: false
        };
    });
  
    test('loginUser (pending)', () => {
        const action = { type: loginUser.pending.type };
        const state = authReducer(initialState, action);

        expect(state.isAuthChecked).toEqual(true);
    });

    test('loginUser (rejected)', () => {
        const action = { type: loginUser.rejected.type };
        const state = authReducer(initialState, action);

        expect(state.isAuthChecked).toEqual(false);
      });
  
    test('loginUser (fulfilled)', () => {
        const action = { type: loginUser.fulfilled.type, payload: user };
        const state = authReducer(initialState, action);

        expect(state.isAuthChecked).toEqual(true);
        expect(state.user).toEqual(user);
    });
});

describe('изменение данных пользователя updateUser', () => {
    test('updateUser (fulfilled)', () => {
        const state = authReducer(initialState, {
            type: updateUser.fulfilled.type, payload: { user: user }
        });

        expect(state.user).toEqual({user});
        expect(state.isAuthChecked).toEqual(true);
    });
});

describe('выход пользователя logoutUser', () => {
    test('logoutUser (fulfilled)', () => {
        const state = authReducer(initialState, {
            type: logoutUser.fulfilled.type, payload: { user: user }
        });
        
        expect(state.user).toEqual(null);
    });
});
