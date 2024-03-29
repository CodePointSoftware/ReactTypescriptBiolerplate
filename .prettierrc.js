module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 2,
    importOrder: [
        '^react(.*)$',
        '^[^@.+](.*)',
        '^@(.*)',
        '(.*)(/store/)(.*)',
        '(.*)(/utils/)(.*)',
        '^[.+/]',
        '(.*)(sass|scss)$',
    ],
    importOrderSeparation: true,
};
