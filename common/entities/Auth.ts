export class Spartan {
    private username: string;
    private password: string;
    private full_name: string;
    private phone_number: number;
    private avatar: string;
    private email: string;
    private role: string;

    constructor(username: string, password: string, full_name: string, phone_number: number, avatar: string, email: string, role: string) {
        this.username = username;
        this.password = password;
        this.full_name = full_name;
        this.phone_number = phone_number;
        this.avatar = avatar;
        this.email = email;
        this.role = role;
    }
}