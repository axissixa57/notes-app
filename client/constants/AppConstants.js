// файл нужен для того чтобы избежать ошибок, при обращении к значениям-константам
// keyMirror нужен для того чтобы ключ имел своё же значение, например LOAD_NOTES_REQUEST: 'LOAD_NOTES_REQUEST'
import keyMirror from 'keymirror';

export default keyMirror({
    LOAD_NOTES_REQUEST: null,
    LOAD_NOTES_SUCCESS: null,
    LOAD_NOTES_FAIL: null
});