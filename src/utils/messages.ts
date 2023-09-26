import Colors from "../common/colors"

export function errorMessage(message: string) {
    return `{${Colors.Red}}Eroare: {${Colors.White}}${message}`
}

export function usageMessage(message: string) {
    return `{${Colors.Gray}}Sintaxa: {${Colors.White}}${message}`
}

export function adminMessage(message: string) {
    return `{${Colors.Red}}(Admin) ${message}`
}