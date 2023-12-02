export default function handleResponse(response: Response) {
    return response.text().then((text) => {
        try {
            const data = text && JSON.parse(text || '{}');
            if (data.error === 'Forbidden') {
                return Promise.reject('У вас немає доступу');
            }
            if (!response.ok) {
                const error_text =
                    data[0] || data.message || response.statusText;
                return Promise.reject(error_text);
            }

            return data;
        } catch (err) {
            console.log(err);
            return Promise.reject('Сервер не відповідає');
        }
    });
}
