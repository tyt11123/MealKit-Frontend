import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../Redux/Actions/menuPageActions';
import * as types from '../Redux/Constants/menuPageConstant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Menu Page Actions', () => {
  it('Open all Accordion', () => {
    const expectedActions = [
      {
      type: types.MENU_PAGE_WEEKLY_ACCORDION_ALL_OPEN,
      }
    ];
    const store = mockStore({ menuPageWeekly: {} });
    store.dispatch(actions.openAllAccordion());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('Close all Accordion', () => {
    const expectedActions = [
      {
      type: types.MENU_PAGE_WEEKLY_ACCORDION_ALL_CLOSE,
      }
    ];
    const store = mockStore({ menuPageWeekly: {} });
    store.dispatch(actions.closeAllAccordion());
    expect(store.getActions()).toEqual(expectedActions);
  });
})