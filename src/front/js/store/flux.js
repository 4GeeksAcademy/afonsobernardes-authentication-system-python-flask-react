const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			accessToken: "",
		},

		actions: {
			// Use getActions to call a function within a fuction

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getToken: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/token", 
												{
													method: "POST",
													headers: {
														"Content-Type": "application/json",
													},

													body: JSON.stringify({
														"email": "adb@hotmail.com",
														"password": "qwerty123"
													}),
												}
											);
					const credentials = await resp.json()
					setStore({ accessToken: credentials.access_token })
					
					// don't forget to return something, that is how the async resolves
					return credentials;
				}catch(error){
					console.log("Error loading access token from backend", error)
				}
			},
		}
	};
};

export default getState;
