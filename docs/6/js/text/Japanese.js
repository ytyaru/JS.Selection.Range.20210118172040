class Japanese {
    static #REGEX_ONLY_HIRA = new RegExp(/^[ぁ-んー　]*$/); // ひらがな
    static #REGEX_ONLY_ZEN_KATA = new RegExp(/^[ァ-ヶー　]*$/); // 全角カタカナ
    static #REGEX_ONLY_ZEN_KATA_N = new RegExp(/^[ァ-ヶ０-９ー　]*$/); // 全角（カタカナ、数字）
    static #REGEX_ONLY_HAN_KATA = new RegExp(/^[ｦ-ﾟ]*$/); // 半角カタカナ
    static #REGEX_ONLY_HAN_KATA_NS = new RegExp(/^[ｦ-ﾟ 0-9]*$/); // 半角（カタカナ、数字、スペース）
    static #REGEX_HAS_HIRA = /[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu;
    static #REGEX_HAS_KATA = /[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]/mu;
    static #REGEX_HAS_KAN = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;
    constructor() {
//        this.#REGEX_HIRA = new RegExp(/^[ぁ-んー　]*$/);
    }
    static isHiragana(text) { return this.#REGEX_ONLY_HIRA.test(text); }
    static hasHiragana(text) { return this.#REGEX_HAS_HIRA.test(text); }
    static hasKatakana(text) { return this.#REGEX_HAS_KATA.test(text); }
    static hasKanji(text) { return this.#REGEX_HAS_KAN.test(text); }
}
