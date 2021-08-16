import { MENU_PAGE_WEEKLY_ACCORDION_ALL_OPEN, MENU_PAGE_WEEKLY_ACCORDION_ALL_CLOSE } from '../Constants/menuPageConstant';

const openAllAccordion = () => (dispatch) => {
    dispatch({ type: MENU_PAGE_WEEKLY_ACCORDION_ALL_OPEN })
}
const closeAllAccordion = () => (dispatch) => {
    dispatch({ type: MENU_PAGE_WEEKLY_ACCORDION_ALL_CLOSE })
}
export { openAllAccordion, closeAllAccordion, }