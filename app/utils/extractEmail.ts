export default function (input: string, separators: RegExp = /[$#?=/]/): string | false {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const parts = input.split(separators);
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed === '') continue;

        // Check if direct part is email
        if (emailRegex.test(trimmed)) {
            return trimmed;
        }

        // Try base64 decode
        try {
            const decoded = atob(trimmed)
            const decodedTrimmed = decoded.trim();
            if (decodedTrimmed !== '' && emailRegex.test(decodedTrimmed)) {
                return decodedTrimmed;
            }
        } catch (e) {
            // Invalid base64, skip
        }
    }

    return false;
}