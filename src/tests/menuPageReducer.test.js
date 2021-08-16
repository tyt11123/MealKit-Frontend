import { menuPageAccordionReducer } from '../Redux/Reducers/menuPageReducer';
import * as types from '../Redux/Constants/menuPageConstant';
import { USER_LOGOUT } from "../Redux/Constants/userConstants";

describe('Menu Page Reducer', () => {
    it('should return the initial state', () => {
      expect(menuPageAccordionReducer(undefined, {})).toEqual({});
    });
    it('should handle MENU_PAGE_WEEKLY_ACCORDION_ALL_OPEN', () => {
      expect(
        menuPageAccordionReducer({}, {
          type: types.MENU_PAGE_WEEKLY_ACCORDION_ALL_OPEN,
        })
      ).toEqual({ allOpen: true, allClose: false });
    });
    it('should handle MENU_PAGE_WEEKLY_ACCORDION_ALL_CLOSE', () => {
        expect(
          menuPageAccordionReducer({}, {
            type: types.MENU_PAGE_WEEKLY_ACCORDION_ALL_CLOSE,
          })
        ).toEqual({ allOpen: false, allClose: true });
    });
    it('should handle USER_LOGOUT', () => {
        expect(
          menuPageAccordionReducer({}, {
            type: USER_LOGOUT,
          })
        ).toEqual({});
    });
  });