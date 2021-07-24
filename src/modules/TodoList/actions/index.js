export default function actionCreater (type, value) {
    return {
        type,
        ...value,
    };
}
