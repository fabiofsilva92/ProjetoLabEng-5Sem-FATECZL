export class AppConstants {

    public static get baseServidor() : string { return "http://localhost:8080/v1/"}

    public static get baseLogin() : string { return this.baseServidor+"auth"}

    public static get baseUrl(): string {return this.baseServidor}

}
