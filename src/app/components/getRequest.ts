type obj = {
    attributes: {
        Name: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        Is_deleted: boolean
    }
}

export default async function  getRequest(queryARGS:  string) {
    const url:  string = `http://localhost:1337/graphql/`

    try {
        const response = await window.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                query: queryARGS
            })
        })

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        return await response.json();
    }catch (error){
        throw error;
    }



    // fetch(`http://localhost:1337/api/` + name, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then(response => response.json())
    //     .then(data => res = data.data.attributes)

}