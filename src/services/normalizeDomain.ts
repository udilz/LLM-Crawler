export function normalizeDomain(domain: string) {
    return domain.startsWith("http") ? domain : `https://${domain}`
}