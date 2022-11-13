import React, { useEffect, useState } from "react";
import facade from "../api/apiFacade";
import { useAuth } from "../stores/AuthContext";

function Home() {
	const { state: authState } = useAuth();
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const getGreeting = async () => {
			let newGreeting = "Welcome!";
			if (authState.roles.includes("admin")) newGreeting = await facade.fetchAdminGreeting();
			else if (authState.roles.includes("user"))
				newGreeting = await facade.fetchUserGreeting();
			setGreeting(newGreeting);
		};
		getGreeting();
	}, [authState.loggedIn]);

	return <div>{greeting}</div>;
}

export default Home;
