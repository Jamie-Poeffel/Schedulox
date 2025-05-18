export function useSession() {
    return {
        data: {
            id: "123",
            name: "John Doe",
            email: "john.doe@example.com"
        },
        status: "authenticated",
        error: null,
    }
}
