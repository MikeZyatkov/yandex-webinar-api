import Message from "../components/Message.js";
import Section from "../components/Section.js";
import Form from "../components/Form.js";
import Api from "../components/Api.js";

const messageSelector = '.message-template';
const messagesWrap = '.messages__list';
const messagesForm = '.messages-form';


const api = new Api({
    address: 'https://j1dg73na92.execute-api.eu-central-1.amazonaws.com/api',
    token: 'test'
});

const createMessage = (data) => {
    const message = new Message({
        data,
        //handleDeleteButtonClick -- колбек при нажатии на кнопку удалить (делает запрос и удаляет)
        handleDeleteButtonClick: () => {
            api.removeMessage(message.getId())
                .then(() => message.removeMessage())
                .catch(err => console.log('Ошибка при удалении'))
        }
    }, messageSelector);
    return message.getView()
};

const messagesList = new Section({
        renderer: (data) => {
            messagesList.addItem(createMessage(data));
        }
    }, messagesWrap
);


// форма с колбеком `addItem`, который делает запрос на бекенд (API) и затем добавляем сообщение на страницу
const form = new Form({
    addItem: (data) => {
        api.addMessage(data)
            .then(result => {
                messagesList.addItem(
                    createMessage({...data, _id: result.id})
                )
            })
            .catch(err => console.log('Ошибка при создании сообщения'))
    }
}, messagesForm);

form.render();

//получаем все данные при начале работы с приложением
api.getMessages()
    .then(result => {
        messagesList.renderItems(result)
    })
    .catch(err => console.log('Ошибка при получении сообщений'));


// const fakeData = [{user: 'test', message: 'test message'}, {user: 'test2', message: 'Привет'}]
// messagesList.renderItems(fakeData)
