export function extractInfo(data: any): any {
    const currenciesKey = Object.keys(data.currencies);
    const languagesKeys = Object.keys(data.languages);
    const allLanguages: string[] = [];
    languagesKeys.forEach((language: string) => {
        allLanguages.push(data.languages[language])
    })

    return {
        ...data,
        currencies: currenciesKey[0] ? currenciesKey[0] : 'unknown',
        languages: allLanguages,
        borders: data.borders ? data.borders : []
    }

}

