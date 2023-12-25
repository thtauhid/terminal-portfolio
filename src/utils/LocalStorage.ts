export type UserType = {
    name: string;
    theme: string;
}

export class UserData {
    // functionality -> initialize an empty UserData object in localstorage when user first visits
    public static init() {
        const existingData: string | null = localStorage.getItem("user");

        if(existingData === null) {
            localStorage.setItem(
                'user',
                JSON.stringify({
                    username: null,
                    theme: null
                })
            )
        }
    }

    // functionality -> update an existing UserData object in localstorage when user override data
    public static set(field: "name" | "theme", value: string) {
        const prevUserData: UserType = JSON.parse(localStorage.getItem("user")!) as UserType;
        const newUserData: UserType = { ...prevUserData, [field]: value };
        localStorage.setItem("user", JSON.stringify(newUserData));
    }

    // functionality -> update an existing UserData object in localstorage when user override data
    public static get(key: "name" | "theme"): string {
        const data: UserType = JSON.parse(localStorage.getItem("user")!) as UserType;
        return data[key] ?? '';
    }
}