/* =========================================================================
 * FIFA World Cup 2026 — 選手名鑑 (Player Almanac) データセット
 * -------------------------------------------------------------------------
 * データ出典 / 信頼度について:
 *   - グループ分け・出場48カ国: 2025/12/05 最終抽選結果（Web検索ベース）
 *   - 招集メンバー: 2026/05 各協会発表 + 2026年1月時点の知識による best-effort
 *   - 数値スタッツ（caps/goals/age 等）は概算を含みます。正確な公式値で
 *     上書きしてご利用ください。
 *
 * スキーマ:
 *   team = {
 *     id, name_en, name_jp, flag(絵文字), confederation, group,
 *     fifa_rank, coach, nickname_en, nickname_jp, note,
 *     players: [ player, ... ]
 *   }
 *   player = {
 *     number, pos(GK|DF|MF|FW), name_en, name_jp,
 *     club_en, club_jp, age, caps, goals,
 *     height_cm, foot('右'|'左'|'両'), traits(特徴 文字列)
 *   }
 *   ※ players が空 [] のチームは「枠のみ」。同じ形式で選手を追記できます。
 * ========================================================================= */

window.WC_DATA = {
  meta: {
    tournament: "FIFA World Cup 2026",
    tournament_jp: "FIFAワールドカップ2026",
    dates: "2026-06-11 — 2026-07-19",
    hosts: ["United States", "Canada", "Mexico"],
    hosts_jp: ["アメリカ", "カナダ", "メキシコ"],
    teams_count: 48,
    generated: "2026-06-03",
    disclaimer: "メンバー・スタッツは各協会発表(2026年5月)および2026年1月時点の公開情報に基づくbest-effortです。数値は概算を含みます。"
  },

  /* 大陸連盟 表示用 */
  confederations: {
    UEFA:     { jp: "欧州 (UEFA)" },
    CONMEBOL: { jp: "南米 (CONMEBOL)" },
    CONCACAF: { jp: "北中米カリブ (CONCACAF)" },
    CAF:      { jp: "アフリカ (CAF)" },
    AFC:      { jp: "アジア (AFC)" },
    OFC:      { jp: "オセアニア (OFC)" }
  },

  teams: [
    /* ===================== GROUP A ===================== */
    {
      id: "mexico", name_en: "Mexico", name_jp: "メキシコ", flag: "🇲🇽",
      confederation: "CONCACAF", group: "A", fifa_rank: 17,
      coach: "Javier Aguirre", nickname_en: "El Tri", nickname_jp: "エル・トリ",
      note: "開催国の一つ。グループ突破は最低ノルマ。", players: [
        { number: 1, pos: "GK", name_en: "Guillermo Ochoa", name_jp: "ギジェルモ・オチョア", club_en: "AVS", club_jp: "AVS", age: 40, caps: 150, goals: 0, height_cm: 185, foot: "右", traits: "6度目のW杯を狙うベテラン守護神。ビッグセーブとカリスマ性。" },
        { number: 9, pos: "FW", name_en: "Raúl Jiménez", name_jp: "ラウル・ヒメネス", club_en: "Fulham", club_jp: "フラム", age: 34, caps: 105, goals: 40, height_cm: 190, foot: "右", traits: "ポストプレーと決定力を兼ね備えたエースFW。" },
        { number: 8, pos: "MF", name_en: "Edson Álvarez", name_jp: "エドソン・アルバレス", club_en: "West Ham / Fenerbahçe", club_jp: "ウェストハム/フェネルバフチェ", age: 28, caps: 80, goals: 4, height_cm: 187, foot: "右", traits: "守備的MFの要。球際とカバーリングに優れる。" }
      ]
    },
    {
      id: "south-africa", name_en: "South Africa", name_jp: "南アフリカ", flag: "🇿🇦",
      confederation: "CAF", group: "A", fifa_rank: 56,
      coach: "Hugo Broos", nickname_en: "Bafana Bafana", nickname_jp: "バファナ・バファナ",
      note: "2010年大会以来の出場。", players: []
    },
    {
      id: "south-korea", name_en: "South Korea", name_jp: "韓国", flag: "🇰🇷",
      confederation: "AFC", group: "A", fifa_rank: 23,
      coach: "Hong Myung-bo", nickname_en: "Taegeuk Warriors", nickname_jp: "テグク・ウォリアーズ",
      note: "アジアの強豪。11大会連続出場。", players: [
        { number: 7, pos: "FW", name_en: "Son Heung-min", name_jp: "ソン・フンミン (孫興慜)", club_en: "LAFC", club_jp: "LAFC", age: 33, caps: 135, goals: 51, height_cm: 183, foot: "両", traits: "韓国代表のキャプテン兼エース。両足の強烈なシュートとスピード。" },
        { number: 18, pos: "FW", name_en: "Lee Kang-in", name_jp: "イ・ガンイン (李康仁)", club_en: "Paris Saint-Germain", club_jp: "パリ・サンジェルマン", age: 25, caps: 45, goals: 8, height_cm: 173, foot: "右", traits: "技巧派の司令塔。左足のキックとドリブル。" },
        { number: 23, pos: "GK", name_en: "Kim Seung-gyu", name_jp: "キム・スンギュ (金承奎)", club_en: "Al-Shabab", club_jp: "アル・シャバブ", age: 35, caps: 75, goals: 0, height_cm: 187, foot: "右", traits: "経験豊富な守護神。" }
      ]
    },
    {
      id: "czechia", name_en: "Czechia", name_jp: "チェコ", flag: "🇨🇿",
      confederation: "UEFA", group: "A", fifa_rank: 41,
      coach: "Ivan Hašek", nickname_en: "Národní tým", nickname_jp: "ナショナルチーム",
      note: "", players: [
        { number: 10, pos: "MF", name_en: "Patrik Schick", name_jp: "パトリック・シック", club_en: "Bayer Leverkusen", club_jp: "レバークーゼン", age: 30, caps: 50, goals: 22, height_cm: 191, foot: "右", traits: "長身ストライカー。空中戦と決定力。EURO2020得点王級の活躍歴。" }
      ]
    },

    /* ===================== GROUP B ===================== */
    {
      id: "canada", name_en: "Canada", name_jp: "カナダ", flag: "🇨🇦",
      confederation: "CONCACAF", group: "B", fifa_rank: 30,
      coach: "Jesse Marsch", nickname_en: "Les Rouges", nickname_jp: "レ・ルージュ",
      note: "開催国の一つ。", players: [
        { number: 19, pos: "FW", name_en: "Alphonso Davies", name_jp: "アルフォンソ・デイビス", club_en: "Bayern Munich", club_jp: "バイエルン・ミュンヘン", age: 25, caps: 55, goals: 15, height_cm: 181, foot: "左", traits: "圧倒的スピードを誇る左サイドの主役。攻守に推進力。" },
        { number: 20, pos: "FW", name_en: "Jonathan David", name_jp: "ジョナサン・デイビッド", club_en: "Juventus", club_jp: "ユベントス", age: 26, caps: 65, goals: 30, height_cm: 180, foot: "両", traits: "クレバーな動き出しと両足の決定力を持つエースFW。" }
      ]
    },
    {
      id: "bosnia", name_en: "Bosnia and Herzegovina", name_jp: "ボスニア・ヘルツェゴビナ", flag: "🇧🇦",
      confederation: "UEFA", group: "B", fifa_rank: 74,
      coach: "Sergej Barbarez", nickname_en: "Zmajevi (Dragons)", nickname_jp: "ドラゴンズ",
      note: "", players: [
        { number: 14, pos: "MF", name_en: "Edin Džeko", name_jp: "エディン・ジェコ", club_en: "Fiorentina", club_jp: "フィオレンティーナ", age: 40, caps: 140, goals: 70, height_cm: 193, foot: "右", traits: "歴代最多得点の伝説的FW。卓越したポストプレーと得点感覚。" }
      ]
    },
    {
      id: "qatar", name_en: "Qatar", name_jp: "カタール", flag: "🇶🇦",
      confederation: "AFC", group: "B", fifa_rank: 36,
      coach: "Julen Lopetegui", nickname_en: "The Maroon", nickname_jp: "アル・アナビ",
      note: "アジアカップ連覇の実績。", players: [
        { number: 11, pos: "FW", name_en: "Akram Afif", name_jp: "アクラム・アフィフ", club_en: "Al-Sadd", club_jp: "アル・サッド", age: 29, caps: 110, goals: 40, height_cm: 175, foot: "右", traits: "アジアの至宝。ドリブルとセットプレーの精度。" }
      ]
    },
    {
      id: "switzerland", name_en: "Switzerland", name_jp: "スイス", flag: "🇨🇭",
      confederation: "UEFA", group: "B", fifa_rank: 20,
      coach: "Murat Yakin", nickname_en: "Nati", nickname_jp: "ナティ",
      note: "近年トーナメントで安定した成績。", players: [
        { number: 10, pos: "MF", name_en: "Granit Xhaka", name_jp: "グラニト・ジャカ", club_en: "Bayer Leverkusen", club_jp: "レバークーゼン", age: 33, caps: 135, goals: 14, height_cm: 185, foot: "左", traits: "中盤の司令塔兼キャプテン。左足の展開力とリーダーシップ。" },
        { number: 23, pos: "DF", name_en: "Manuel Akanji", name_jp: "マヌエル・アカンジ", club_en: "Manchester City", club_jp: "マンチェスター・シティ", age: 30, caps: 70, goals: 4, height_cm: 187, foot: "右", traits: "ビルドアップ能力に優れたモダンCB。" }
      ]
    },

    /* ===================== GROUP C ===================== */
    {
      id: "brazil", name_en: "Brazil", name_jp: "ブラジル", flag: "🇧🇷",
      confederation: "CONMEBOL", group: "C", fifa_rank: 5,
      coach: "Carlo Ancelotti", nickname_en: "Seleção", nickname_jp: "セレソン",
      note: "通算5度の優勝を誇る常勝国。", players: [
        { number: 10, pos: "FW", name_en: "Vinícius Júnior", name_jp: "ヴィニシウス・ジュニオール", club_en: "Real Madrid", club_jp: "レアル・マドリード", age: 25, caps: 45, goals: 8, height_cm: 176, foot: "右", traits: "世界最高峰のドリブラー。左サイドからの突破と決定力。" },
        { number: 9, pos: "FW", name_en: "Rodrygo", name_jp: "ホドリゴ", club_en: "Real Madrid", club_jp: "レアル・マドリード", age: 25, caps: 35, goals: 8, height_cm: 174, foot: "右", traits: "勝負強さと柔軟なポジショニング。" },
        { number: 7, pos: "MF", name_en: "Raphinha", name_jp: "ハフィーニャ", club_en: "Barcelona", club_jp: "バルセロナ", age: 29, caps: 40, goals: 15, height_cm: 176, foot: "左", traits: "右サイドの推進力とゴール関与。爆発的な得点力。" },
        { number: 5, pos: "MF", name_en: "Bruno Guimarães", name_jp: "ブルーノ・ギマランイス", club_en: "Newcastle United", club_jp: "ニューカッスル", age: 28, caps: 45, goals: 3, height_cm: 182, foot: "右", traits: "攻守両面で効く万能型ボランチ。" }
      ]
    },
    {
      id: "morocco", name_en: "Morocco", name_jp: "モロッコ", flag: "🇲🇦",
      confederation: "CAF", group: "C", fifa_rank: 12,
      coach: "Walid Regragui", nickname_en: "Atlas Lions", nickname_jp: "アトラスの獅子",
      note: "2022年大会4位。アフリカ勢初のベスト4。", players: [
        { number: 7, pos: "FW", name_en: "Hakim Ziyech", name_jp: "ハキム・ジエシュ", club_en: "Al-Duhail", club_jp: "アル・ドゥハイル", age: 33, caps: 60, goals: 20, height_cm: 181, foot: "左", traits: "左足のキック精度とセットプレー。" },
        { number: 5, pos: "DF", name_en: "Achraf Hakimi", name_jp: "アシュラフ・ハキミ", club_en: "Paris Saint-Germain", club_jp: "パリ・サンジェルマン", age: 27, caps: 80, goals: 11, height_cm: 181, foot: "右", traits: "世界屈指の攻撃的右SB。スピードと攻撃参加。" }
      ]
    },
    {
      id: "haiti", name_en: "Haiti", name_jp: "ハイチ", flag: "🇭🇹",
      confederation: "CONCACAF", group: "C", fifa_rank: 83,
      coach: "Sébastien Migné", nickname_en: "Les Grenadiers", nickname_jp: "レ・グルナディエ",
      note: "1974年以来となる悲願のW杯出場。", players: []
    },
    {
      id: "scotland", name_en: "Scotland", name_jp: "スコットランド", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
      confederation: "UEFA", group: "C", fifa_rank: 44,
      coach: "Steve Clarke", nickname_en: "Tartan Army", nickname_jp: "タータン・アーミー",
      note: "1998年以来のW杯本大会。", players: [
        { number: 4, pos: "MF", name_en: "Scott McTominay", name_jp: "スコット・マクトミネイ", club_en: "Napoli", club_jp: "ナポリ", age: 29, caps: 60, goals: 12, height_cm: 193, foot: "右", traits: "ボックス・トゥ・ボックスの推進力と得点力。" },
        { number: 3, pos: "DF", name_en: "Andrew Robertson", name_jp: "アンドリュー・ロバートソン", club_en: "Liverpool", club_jp: "リバプール", age: 32, caps: 80, goals: 4, height_cm: 178, foot: "左", traits: "キャプテン。攻撃的な左SBでクロス精度が高い。" }
      ]
    },

    /* ===================== GROUP D ===================== */
    {
      id: "usa", name_en: "United States", name_jp: "アメリカ", flag: "🇺🇸",
      confederation: "CONCACAF", group: "D", fifa_rank: 16,
      coach: "Mauricio Pochettino", nickname_en: "USMNT", nickname_jp: "USMNT",
      note: "開催国の一つ。", players: [
        { number: 10, pos: "MF", name_en: "Christian Pulisic", name_jp: "クリスティアン・プリシッチ", club_en: "AC Milan", club_jp: "ACミラン", age: 27, caps: 75, goals: 30, height_cm: 177, foot: "右", traits: "米国の象徴。ドリブルとゴール関与で攻撃を牽引。" },
        { number: 8, pos: "MF", name_en: "Weston McKennie", name_jp: "ウェストン・マッケニー", club_en: "Juventus", club_jp: "ユベントス", age: 27, caps: 55, goals: 11, height_cm: 183, foot: "右", traits: "運動量豊富な中盤。" }
      ]
    },
    {
      id: "paraguay", name_en: "Paraguay", name_jp: "パラグアイ", flag: "🇵🇾",
      confederation: "CONMEBOL", group: "D", fifa_rank: 48,
      coach: "Gustavo Alfaro", nickname_en: "La Albirroja", nickname_jp: "ラ・アルビロハ",
      note: "2010年以来の出場。堅守が持ち味。", players: [
        { number: 4, pos: "DF", name_en: "Gustavo Gómez", name_jp: "グスタボ・ゴメス", club_en: "Palmeiras", club_jp: "パルメイラス", age: 32, caps: 60, goals: 8, height_cm: 187, foot: "右", traits: "キャプテンを務める守備の支柱。" }
      ]
    },
    {
      id: "australia", name_en: "Australia", name_jp: "オーストラリア", flag: "🇦🇺",
      confederation: "AFC", group: "D", fifa_rank: 26,
      coach: "Tony Popovic", nickname_en: "Socceroos", nickname_jp: "サッカルーズ",
      note: "アジア予選を勝ち抜いた常連国。", players: [
        { number: 7, pos: "MF", name_en: "Mathew Leckie", name_jp: "マシュー・レッキー", club_en: "Melbourne City", club_jp: "メルボルン・シティ", age: 35, caps: 80, goals: 15, height_cm: 181, foot: "右", traits: "豊富な経験とスピード。" }
      ]
    },
    {
      id: "turkiye", name_en: "Türkiye", name_jp: "トルコ", flag: "🇹🇷",
      confederation: "UEFA", group: "D", fifa_rank: 27,
      coach: "Vincenzo Montella", nickname_en: "Ay-Yıldızlılar", nickname_jp: "月と星",
      note: "若手台頭で躍進。2002年以来の本大会。", players: [
        { number: 10, pos: "MF", name_en: "Arda Güler", name_jp: "アルダ・ギュレル", club_en: "Real Madrid", club_jp: "レアル・マドリード", age: 21, caps: 35, goals: 8, height_cm: 176, foot: "左", traits: "左足の魔術師。創造性とキック精度に優れる新世代の旗手。" },
        { number: 20, pos: "MF", name_en: "Kenan Yıldız", name_jp: "ケナン・ユルディズ", club_en: "Juventus", club_jp: "ユベントス", age: 21, caps: 25, goals: 6, height_cm: 185, foot: "右", traits: "ドリブルとシュートを兼ね備えた万能アタッカー。" }
      ]
    },

    /* ===================== GROUP E ===================== */
    {
      id: "germany", name_en: "Germany", name_jp: "ドイツ", flag: "🇩🇪",
      confederation: "UEFA", group: "E", fifa_rank: 10,
      coach: "Julian Nagelsmann", nickname_en: "Die Mannschaft", nickname_jp: "ディ・マンシャフト",
      note: "通算4度の優勝国。再建が進む。", players: [
        { number: 10, pos: "MF", name_en: "Jamal Musiala", name_jp: "ジャマル・ムシアラ", club_en: "Bayern Munich", club_jp: "バイエルン・ミュンヘン", age: 23, caps: 45, goals: 12, height_cm: 184, foot: "右", traits: "狭い局面を打開するドリブルと創造性。ドイツの新エース。" },
        { number: 8, pos: "MF", name_en: "Florian Wirtz", name_jp: "フロリアン・ヴィルツ", club_en: "Liverpool", club_jp: "リバプール", age: 23, caps: 40, goals: 8, height_cm: 176, foot: "右", traits: "視野とラストパス、得点関与に長けた司令塔。" },
        { number: 13, pos: "FW", name_en: "Kai Havertz", name_jp: "カイ・ハフェルツ", club_en: "Arsenal", club_jp: "アーセナル", age: 27, caps: 50, goals: 18, height_cm: 193, foot: "左", traits: "万能型アタッカー。高さと技術。" }
      ]
    },
    {
      id: "curacao", name_en: "Curaçao", name_jp: "キュラソー", flag: "🇨🇼",
      confederation: "CONCACAF", group: "E", fifa_rank: 82,
      coach: "Dick Advocaat", nickname_en: "Blue Wave", nickname_jp: "ブルー・ウェーブ",
      note: "史上最小人口の本大会出場国。初出場。", players: []
    },
    {
      id: "ivory-coast", name_en: "Ivory Coast", name_jp: "コートジボワール", flag: "🇨🇮",
      confederation: "CAF", group: "E", fifa_rank: 40,
      coach: "Emerse Faé", nickname_en: "Les Éléphants", nickname_jp: "レ・ゼレファン",
      note: "2023年アフリカ選手権王者。", players: [
        { number: 19, pos: "FW", name_en: "Sébastien Haller", name_jp: "セバスティアン・アレル", club_en: "Utrecht", club_jp: "ユトレヒト", age: 31, caps: 45, goals: 22, height_cm: 190, foot: "右", traits: "長身ターゲットマン。ポストと決定力。" }
      ]
    },
    {
      id: "ecuador", name_en: "Ecuador", name_jp: "エクアドル", flag: "🇪🇨",
      confederation: "CONMEBOL", group: "E", fifa_rank: 24,
      coach: "Sebastián Beccacece", nickname_en: "La Tri", nickname_jp: "ラ・トリ",
      note: "堅守と若い才能。", players: [
        { number: 23, pos: "MF", name_en: "Moisés Caicedo", name_jp: "モイセス・カイセド", club_en: "Chelsea", club_jp: "チェルシー", age: 24, caps: 50, goals: 4, height_cm: 178, foot: "右", traits: "球際とカバー範囲に優れる世界級ボランチ。" }
      ]
    },

    /* ===================== GROUP F (日本のグループ) ===================== */
    {
      id: "netherlands", name_en: "Netherlands", name_jp: "オランダ", flag: "🇳🇱",
      confederation: "UEFA", group: "F", fifa_rank: 7,
      coach: "Ronald Koeman", nickname_en: "Oranje", nickname_jp: "オラニエ",
      note: "日本と同組(F組)。初戦の相手。優勝候補の一角。", players: [
        { number: 4, pos: "DF", name_en: "Virgil van Dijk", name_jp: "フィルジル・ファン・ダイク", club_en: "Liverpool", club_jp: "リバプール", age: 34, caps: 80, goals: 9, height_cm: 195, foot: "右", traits: "キャプテン。世界最高峰のCB。対人・空中戦・統率力。" },
        { number: 4, pos: "MF", name_en: "Frenkie de Jong", name_jp: "フレンキー・デ・ヨング", club_en: "Barcelona", club_jp: "バルセロナ", age: 28, caps: 60, goals: 3, height_cm: 181, foot: "右", traits: "運ぶドリブルと配球で中盤を支配。" },
        { number: 11, pos: "FW", name_en: "Cody Gakpo", name_jp: "コディ・ガクポ", club_en: "Liverpool", club_jp: "リバプール", age: 26, caps: 40, goals: 15, height_cm: 193, foot: "右", traits: "左から仕掛ける長身アタッカー。得点力。" }
      ]
    },
    {
      id: "japan", name_en: "Japan", name_jp: "日本", flag: "🇯🇵",
      confederation: "AFC", group: "F", fifa_rank: 18,
      coach: "Hajime Moriyasu (森保一)", nickname_en: "Samurai Blue", nickname_jp: "サムライブルー",
      note: "F組。初戦オランダ(6/14)、第2戦チュニジア(6/20)、第3戦スウェーデン(6/25)。8大会連続出場。長友佑都はアジア初の5大会出場へ。",
      players: [
        /* --- GK --- */
        { number: 1, pos: "GK", name_en: "Zion Suzuki", name_jp: "鈴木 彩艶 (すずき ザイオン)", club_en: "Parma", club_jp: "パルマ", age: 23, caps: 20, goals: 0, height_cm: 190, foot: "右", traits: "正守護神。190cmの体格と反射神経、足元の技術。セリエAで主力。" },
        { number: 12, pos: "GK", name_en: "Daniel Schmidt", name_jp: "シュミット・ダニエル", club_en: "Sint-Truiden", club_jp: "シント=トロイデン", age: 33, caps: 12, goals: 0, height_cm: 197, foot: "右", traits: "長身でハイボールに強い経験豊富なGK。" },
        { number: 23, pos: "GK", name_en: "Daiya Maekawa", name_jp: "前川 黛也 (まえかわ だいや)", club_en: "Vissel Kobe", club_jp: "ヴィッセル神戸", age: 28, caps: 4, goals: 0, height_cm: 184, foot: "右", traits: "Jリーグ王者の守護神。安定したシュートストップ。" },

        /* --- DF --- */
        { number: 2, pos: "DF", name_en: "Yukinari Sugawara", name_jp: "菅原 由勢 (すがわら ゆきなり)", club_en: "Southampton", club_jp: "サウサンプトン", age: 25, caps: 25, goals: 1, height_cm: 178, foot: "右", traits: "攻撃的右SB/WB。スピードと攻撃参加、対人守備。" },
        { number: 3, pos: "DF", name_en: "Shogo Taniguchi", name_jp: "谷口 彰悟 (たにぐち しょうご)", club_en: "Al-Rayyan", club_jp: "アル・ラーヤン", age: 34, caps: 25, goals: 2, height_cm: 183, foot: "右", traits: "ビルドアップとカバーに長けるCB。3バックの中央で安定感。" },
        { number: 4, pos: "DF", name_en: "Ko Itakura", name_jp: "板倉 滉 (いたくら こう)", club_en: "Ajax", club_jp: "アヤックス", age: 29, caps: 40, goals: 4, height_cm: 186, foot: "右", traits: "守備の中心。対人・読み・配球を兼備。フィードも正確。" },
        { number: 5, pos: "DF", name_en: "Yuto Nagatomo", name_jp: "長友 佑都 (ながとも ゆうと)", club_en: "FC Tokyo", club_jp: "FC東京", age: 39, caps: 145, goals: 4, height_cm: 170, foot: "左", traits: "アジア初の5大会連続出場へ。経験とリーダーシップ、衰えぬ運動量。" },
        { number: 16, pos: "DF", name_en: "Takehiro Tomiyasu", name_jp: "冨安 健洋 (とみやす たけひろ)", club_en: "Arsenal", club_jp: "アーセナル", age: 27, caps: 45, goals: 2, height_cm: 188, foot: "右", traits: "複数ポジションをこなすマルチDF。対人の強さと戦術理解。" },
        { number: 19, pos: "DF", name_en: "Hiroki Ito", name_jp: "伊藤 洋輝 (いとう ひろき)", club_en: "Bayern Munich", club_jp: "バイエルン・ミュンヘン", age: 27, caps: 25, goals: 1, height_cm: 188, foot: "左", traits: "左利きCB/SB。左足の展開力とロングフィード。" },
        { number: 22, pos: "DF", name_en: "Koki Machida", name_jp: "町田 浩樹 (まちだ こうき)", club_en: "Hoffenheim", club_jp: "ホッフェンハイム", age: 28, caps: 18, goals: 1, height_cm: 190, foot: "左", traits: "長身左利きCB。空中戦と落ち着いた対応。" },
        { number: 26, pos: "DF", name_en: "Go Hatano", name_jp: "畑野? (代表例)", club_en: "—", club_jp: "—", age: 24, caps: 5, goals: 0, height_cm: 180, foot: "右", traits: "（補欠枠の例。確定情報で上書きしてください）" },

        /* --- MF --- */
        { number: 6, pos: "MF", name_en: "Wataru Endo", name_jp: "遠藤 航 (えんどう わたる)", club_en: "Liverpool", club_jp: "リバプール", age: 33, caps: 65, goals: 3, height_cm: 178, foot: "右", traits: "キャプテン。アンカーとしての潰しとセカンドボール回収、リーダーシップ。" },
        { number: 7, pos: "MF", name_en: "Takefusa Kubo", name_jp: "久保 建英 (くぼ たけふさ)", club_en: "Real Sociedad", club_jp: "レアル・ソシエダ", age: 24, caps: 40, goals: 6, height_cm: 173, foot: "左", traits: "右サイドの主役。緩急のドリブルと左足、ラストパス。攻撃の中心。" },
        { number: 8, pos: "MF", name_en: "Daichi Kamada", name_jp: "鎌田 大地 (かまだ だいち)", club_en: "Crystal Palace", club_jp: "クリスタル・パレス", age: 29, caps: 40, goals: 8, height_cm: 184, foot: "右", traits: "ライン間で受ける技術とゴール関与。プレーメイク。" },
        { number: 10, pos: "MF", name_en: "Takumi Minamino", name_jp: "南野 拓実 (みなみの たくみ)", club_en: "AS Monaco", club_jp: "ASモナコ", age: 31, caps: 60, goals: 22, height_cm: 174, foot: "右", traits: "決定力と動き出し。複数の攻撃ポジションをこなす。" },
        { number: 13, pos: "MF", name_en: "Hidemasa Morita", name_jp: "守田 英正 (もりた ひでまさ)", club_en: "Sporting CP", club_jp: "スポルティング", age: 30, caps: 40, goals: 2, height_cm: 177, foot: "右", traits: "インサイドハーフ。攻守のバランスと配球。※負傷リスクあり(検索で離脱情報も)。" },
        { number: 14, pos: "MF", name_en: "Junya Ito", name_jp: "伊東 純也 (いとう じゅんや)", club_en: "Stade de Reims", club_jp: "スタッド・ランス", age: 32, caps: 50, goals: 12, height_cm: 176, foot: "右", traits: "圧倒的スピードの右ウインガー。縦突破とクロス。" },
        { number: 17, pos: "MF", name_en: "Ao Tanaka", name_jp: "田中 碧 (たなか あお)", club_en: "Leeds United", club_jp: "リーズ・ユナイテッド", age: 27, caps: 30, goals: 4, height_cm: 180, foot: "右", traits: "中盤のオーガナイザー。展開力とボックス侵入。" },
        { number: 8, pos: "MF", name_en: "Ritsu Doan", name_jp: "堂安 律 (どうあん りつ)", club_en: "Eintracht Frankfurt", club_jp: "アイントラハト・フランクフルト", age: 27, caps: 45, goals: 8, height_cm: 172, foot: "左", traits: "勝負強い左足のアタッカー。カットインシュートと勝負どころでの得点。" },

        /* --- FW --- */
        { number: 9, pos: "FW", name_en: "Ayase Ueda", name_jp: "上田 綺世 (うえだ あやせ)", club_en: "Feyenoord", club_jp: "フェイエノールト", age: 27, caps: 30, goals: 12, height_cm: 182, foot: "右", traits: "エースCF。動き出しと一発の決定力、ポストプレー。" },
        { number: 11, pos: "FW", name_en: "Daizen Maeda", name_jp: "前田 大然 (まえだ だいぜん)", club_en: "Celtic", club_jp: "セルティック", age: 28, caps: 35, goals: 8, height_cm: 173, foot: "右", traits: "驚異的なスプリントと前線からの守備。裏抜け。" },
        { number: 15, pos: "FW", name_en: "Kyogo Furuhashi", name_jp: "古橋 亨梧 (ふるはし きょうご)", club_en: "Rennes", club_jp: "レンヌ", age: 31, caps: 20, goals: 4, height_cm: 170, foot: "右", traits: "抜群のオフザボールと決定力を持つ快速ストライカー。" },
        { number: 18, pos: "FW", name_en: "Koki Ogawa", name_jp: "小川 航基 (おがわ こうき)", club_en: "NEC Nijmegen", club_jp: "NECナイメヘン", age: 28, caps: 15, goals: 6, height_cm: 186, foot: "右", traits: "高さと空中戦に強いターゲットマン。" },
        { number: 20, pos: "MF", name_en: "Reo Hatate", name_jp: "旗手 怜央 (はたて れお)", club_en: "Celtic", club_jp: "セルティック", age: 28, caps: 12, goals: 1, height_cm: 174, foot: "左", traits: "左利きの万能MF。配球と推進力。" },
        { number: 24, pos: "DF", name_en: "Daiki Hashioka", name_jp: "橋岡 大樹 (はしおか だいき)", club_en: "Luton Town", club_jp: "ルートン・タウン", age: 26, caps: 8, goals: 0, height_cm: 186, foot: "右", traits: "サイドと中央をこなせる長身DF。対人とフィジカル。" }
      ]
    },
    {
      id: "sweden", name_en: "Sweden", name_jp: "スウェーデン", flag: "🇸🇪",
      confederation: "UEFA", group: "F", fifa_rank: 38,
      coach: "Graham Potter", nickname_en: "Blågult", nickname_jp: "ブロー・ギュル",
      note: "日本と同組。第3戦(6/25)の相手。強力2トップが武器。", players: [
        { number: 9, pos: "FW", name_en: "Alexander Isak", name_jp: "アレクサンデル・イサク", club_en: "Liverpool", club_jp: "リバプール", age: 26, caps: 45, goals: 15, height_cm: 192, foot: "右", traits: "長身ながら俊敏。ドリブルと卓越した決定力を持つエース。" },
        { number: 11, pos: "FW", name_en: "Viktor Gyökeres", name_jp: "ヴィクトル・ヨケレス", club_en: "Arsenal", club_jp: "アーセナル", age: 27, caps: 30, goals: 18, height_cm: 187, foot: "右", traits: "パワーとスピードを兼備した点取り屋。裏抜けと強さ。" }
      ]
    },
    {
      id: "tunisia", name_en: "Tunisia", name_jp: "チュニジア", flag: "🇹🇳",
      confederation: "CAF", group: "F", fifa_rank: 45,
      coach: "Sami Trabelsi", nickname_en: "Eagles of Carthage", nickname_jp: "カルタゴの鷲",
      note: "日本と同組。第2戦(6/20)の相手。堅守が持ち味。", players: [
        { number: 10, pos: "MF", name_en: "Hannibal Mejbri", name_jp: "ハンニバル・メイブリ", club_en: "Burnley", club_jp: "バーンリー", age: 23, caps: 30, goals: 3, height_cm: 180, foot: "右", traits: "闘志あふれる中盤。技術と運動量。" }
      ]
    },

    /* ===================== GROUP G ===================== */
    {
      id: "belgium", name_en: "Belgium", name_jp: "ベルギー", flag: "🇧🇪",
      confederation: "UEFA", group: "G", fifa_rank: 8,
      coach: "Rudi Garcia", nickname_en: "Red Devils", nickname_jp: "レッド・デビルズ",
      note: "黄金世代から世代交代へ。", players: [
        { number: 7, pos: "MF", name_en: "Kevin De Bruyne", name_jp: "ケヴィン・デ・ブライネ", club_en: "Napoli", club_jp: "ナポリ", age: 34, caps: 110, goals: 30, height_cm: 181, foot: "右", traits: "世界屈指の司令塔。圧巻のラストパスとミドル。" },
        { number: 10, pos: "FW", name_en: "Jérémy Doku", name_jp: "ジェレミー・ドク", club_en: "Manchester City", club_jp: "マンチェスター・シティ", age: 23, caps: 35, goals: 5, height_cm: 171, foot: "右", traits: "爆発的なドリブルで仕掛ける左ウインガー。" }
      ]
    },
    {
      id: "egypt", name_en: "Egypt", name_jp: "エジプト", flag: "🇪🇬",
      confederation: "CAF", group: "G", fifa_rank: 32,
      coach: "Hossam Hassan", nickname_en: "The Pharaohs", nickname_jp: "ファラオズ",
      note: "サラーを擁する優勝候補のダークホース。", players: [
        { number: 10, pos: "FW", name_en: "Mohamed Salah", name_jp: "モハメド・サラー", club_en: "Liverpool", club_jp: "リバプール", age: 33, caps: 110, goals: 60, height_cm: 175, foot: "左", traits: "エジプトの英雄。左足の決定力とスピード、カットイン。" }
      ]
    },
    {
      id: "iran", name_en: "Iran", name_jp: "イラン", flag: "🇮🇷",
      confederation: "AFC", group: "G", fifa_rank: 19,
      coach: "Amir Ghalenoei", nickname_en: "Team Melli", nickname_jp: "チーム・メリ",
      note: "アジアの強豪。屈強な守備。", players: [
        { number: 9, pos: "FW", name_en: "Mehdi Taremi", name_jp: "メフディ・タレミ", club_en: "Olympiacos", club_jp: "オリンピアコス", age: 33, caps: 90, goals: 50, height_cm: 187, foot: "右", traits: "ポストと決定力を兼ね備えたエース。" }
      ]
    },
    {
      id: "new-zealand", name_en: "New Zealand", name_jp: "ニュージーランド", flag: "🇳🇿",
      confederation: "OFC", group: "G", fifa_rank: 86,
      coach: "Darren Bazeley", nickname_en: "All Whites", nickname_jp: "オール・ホワイツ",
      note: "オセアニア代表。フィジカルとセットプレー。", players: [
        { number: 9, pos: "FW", name_en: "Chris Wood", name_jp: "クリス・ウッド", club_en: "Nottingham Forest", club_jp: "ノッティンガム・フォレスト", age: 34, caps: 75, goals: 40, height_cm: 191, foot: "右", traits: "高さと得点力を誇るキャプテン兼エースFW。" }
      ]
    },

    /* ===================== GROUP H ===================== */
    {
      id: "spain", name_en: "Spain", name_jp: "スペイン", flag: "🇪🇸",
      confederation: "UEFA", group: "H", fifa_rank: 2,
      coach: "Luis de la Fuente", nickname_en: "La Roja", nickname_jp: "ラ・ロハ",
      note: "EURO2024王者。最有力の優勝候補。", players: [
        { number: 19, pos: "FW", name_en: "Lamine Yamal", name_jp: "ラミン・ヤマル", club_en: "Barcelona", club_jp: "バルセロナ", age: 18, caps: 30, goals: 8, height_cm: 180, foot: "左", traits: "天才的ドリブラー。右サイドからのカットインと創造性。次代の主役。" },
        { number: 9, pos: "FW", name_en: "Nico Williams", name_jp: "ニコ・ウィリアムズ", club_en: "Athletic Bilbao", club_jp: "アスレティック・ビルバオ", age: 23, caps: 35, goals: 8, height_cm: 181, foot: "右", traits: "左サイドの快速アタッカー。突破とフィニッシュ。" },
        { number: 5, pos: "MF", name_en: "Pedri", name_jp: "ペドリ", club_en: "Barcelona", club_jp: "バルセロナ", age: 23, caps: 40, goals: 4, height_cm: 174, foot: "右", traits: "中盤の心臓。卓越したボール扱いとリズム。" }
      ]
    },
    {
      id: "cape-verde", name_en: "Cape Verde", name_jp: "カーボベルデ", flag: "🇨🇻",
      confederation: "CAF", group: "H", fifa_rank: 70,
      coach: "Bubista", nickname_en: "Blue Sharks", nickname_jp: "ブルー・シャークス",
      note: "悲願の初出場。人口約50万人の小国の快挙。", players: []
    },
    {
      id: "saudi-arabia", name_en: "Saudi Arabia", name_jp: "サウジアラビア", flag: "🇸🇦",
      confederation: "AFC", group: "H", fifa_rank: 58,
      coach: "Hervé Renard", nickname_en: "Green Falcons", nickname_jp: "グリーン・ファルコンズ",
      note: "2022年大会でアルゼンチンを撃破した実績。", players: [
        { number: 10, pos: "MF", name_en: "Salem Al-Dawsari", name_jp: "サレム・アル・ドサリ", club_en: "Al-Hilal", club_jp: "アル・ヒラル", age: 34, caps: 90, goals: 25, height_cm: 167, foot: "右", traits: "左足の技巧とドリブル。アルゼンチン戦の決勝点で有名。" }
      ]
    },
    {
      id: "uruguay", name_en: "Uruguay", name_jp: "ウルグアイ", flag: "🇺🇾",
      confederation: "CONMEBOL", group: "H", fifa_rank: 15,
      coach: "Marcelo Bielsa", nickname_en: "La Celeste", nickname_jp: "ラ・セレステ",
      note: "通算2度の優勝。タレント豊富。", players: [
        { number: 10, pos: "FW", name_en: "Federico Valverde", name_jp: "フェデリコ・バルベルデ", club_en: "Real Madrid", club_jp: "レアル・マドリード", age: 27, caps: 65, goals: 12, height_cm: 182, foot: "右", traits: "攻守に走り回る万能型。強烈なミドルとスタミナ。" },
        { number: 9, pos: "FW", name_en: "Darwin Núñez", name_jp: "ダルウィン・ヌニェス", club_en: "Al-Hilal", club_jp: "アル・ヒラル", age: 26, caps: 40, goals: 15, height_cm: 187, foot: "右", traits: "圧倒的なスピードとパワーのストライカー。" }
      ]
    },

    /* ===================== GROUP I ===================== */
    {
      id: "france", name_en: "France", name_jp: "フランス", flag: "🇫🇷",
      confederation: "UEFA", group: "I", fifa_rank: 3,
      coach: "Didier Deschamps", nickname_en: "Les Bleus", nickname_jp: "レ・ブルー",
      note: "2018年王者・2022年準優勝。最有力候補。", players: [
        { number: 10, pos: "FW", name_en: "Kylian Mbappé", name_jp: "キリアン・エムバペ", club_en: "Real Madrid", club_jp: "レアル・マドリード", age: 27, caps: 90, goals: 50, height_cm: 178, foot: "右", traits: "世界最高のアタッカー。超加速、決定力、勝負強さ。キャプテン。" },
        { number: 9, pos: "FW", name_en: "Ousmane Dembélé", name_jp: "ウスマン・デンベレ", club_en: "Paris Saint-Germain", club_jp: "パリ・サンジェルマン", age: 28, caps: 55, goals: 8, height_cm: 178, foot: "両", traits: "両足を自在に操るドリブラー。緩急と突破。" },
        { number: 8, pos: "MF", name_en: "Aurélien Tchouaméni", name_jp: "オーレリアン・チュアメニ", club_en: "Real Madrid", club_jp: "レアル・マドリード", age: 26, caps: 45, goals: 3, height_cm: 187, foot: "右", traits: "守備力と配球を兼ね備えたアンカー。" }
      ]
    },
    {
      id: "senegal", name_en: "Senegal", name_jp: "セネガル", flag: "🇸🇳",
      confederation: "CAF", group: "I", fifa_rank: 18,
      coach: "Pape Thiaw", nickname_en: "Lions of Teranga", nickname_jp: "テランガのライオン",
      note: "アフリカの強豪。2021アフリカ選手権王者。", players: [
        { number: 9, pos: "FW", name_en: "Nicolas Jackson", name_jp: "ニコラ・ジャクソン", club_en: "Bayern Munich", club_jp: "バイエルン・ミュンヘン", age: 24, caps: 25, goals: 6, height_cm: 186, foot: "右", traits: "スピードとフィジカルを備えた万能FW。" },
        { number: 17, pos: "MF", name_en: "Pape Matar Sarr", name_jp: "パプ・マタル・サール", club_en: "Tottenham", club_jp: "トッテナム", age: 23, caps: 35, goals: 4, height_cm: 184, foot: "右", traits: "ボックス・トゥ・ボックスの推進力。" }
      ]
    },
    {
      id: "iraq", name_en: "Iraq", name_jp: "イラク", flag: "🇮🇶",
      confederation: "AFC", group: "I", fifa_rank: 57,
      coach: "Graham Arnold", nickname_en: "Lions of Mesopotamia", nickname_jp: "メソポタミアのライオン",
      note: "1986年以来となる本大会出場。", players: [
        { number: 10, pos: "MF", name_en: "Ali Jasim", name_jp: "アリ・ジャシム", club_en: "Como", club_jp: "コモ", age: 22, caps: 30, goals: 6, height_cm: 178, foot: "右", traits: "創造性とドリブルを持つ若き司令塔。" }
      ]
    },
    {
      id: "norway", name_en: "Norway", name_jp: "ノルウェー", flag: "🇳🇴",
      confederation: "UEFA", group: "I", fifa_rank: 25,
      coach: "Ståle Solbakken", nickname_en: "Løvene (The Lions)", nickname_jp: "ザ・ライオンズ",
      note: "1998年以来の悲願の出場。ハーランドが牽引。", players: [
        { number: 9, pos: "FW", name_en: "Erling Haaland", name_jp: "アーリング・ハーランド", club_en: "Manchester City", club_jp: "マンチェスター・シティ", age: 25, caps: 45, goals: 45, height_cm: 195, foot: "左", traits: "規格外の決定力とフィジカル。世界最高峰のゴールマシン。" },
        { number: 8, pos: "MF", name_en: "Martin Ødegaard", name_jp: "マルティン・ウーデゴール", club_en: "Arsenal", club_jp: "アーセナル", age: 27, caps: 60, goals: 10, height_cm: 178, foot: "左", traits: "キャプテン。創造性とラストパスで攻撃を組み立てる司令塔。" }
      ]
    },

    /* ===================== GROUP J ===================== */
    {
      id: "argentina", name_en: "Argentina", name_jp: "アルゼンチン", flag: "🇦🇷",
      confederation: "CONMEBOL", group: "J", fifa_rank: 1,
      coach: "Lionel Scaloni", nickname_en: "La Albiceleste", nickname_jp: "ラ・アルビセレステ",
      note: "前回(2022)王者。FIFAランキング1位の連覇候補。", players: [
        { number: 10, pos: "FW", name_en: "Lionel Messi", name_jp: "リオネル・メッシ", club_en: "Inter Miami", club_jp: "インテル・マイアミ", age: 38, caps: 195, goals: 115, height_cm: 170, foot: "左", traits: "史上最高の一人。左足の魔術、ラストパス、決定力。ラストダンスへ。" },
        { number: 22, pos: "FW", name_en: "Lautaro Martínez", name_jp: "ラウタロ・マルティネス", club_en: "Inter", club_jp: "インテル", age: 28, caps: 70, goals: 35, height_cm: 174, foot: "右", traits: "勝負強いエースCF。動き出しと決定力。" },
        { number: 7, pos: "MF", name_en: "Rodrigo De Paul", name_jp: "ロドリゴ・デ・パウル", club_en: "Inter Miami", club_jp: "インテル・マイアミ", age: 31, caps: 75, goals: 4, height_cm: 180, foot: "右", traits: "運動量と球際でチームを支える中盤の心臓。" }
      ]
    },
    {
      id: "algeria", name_en: "Algeria", name_jp: "アルジェリア", flag: "🇩🇿",
      confederation: "CAF", group: "J", fifa_rank: 37,
      coach: "Vladimir Petković", nickname_en: "Les Fennecs", nickname_jp: "砂漠の狐",
      note: "", players: [
        { number: 7, pos: "MF", name_en: "Riyad Mahrez", name_jp: "リヤド・マフレズ", club_en: "Al-Ahli", club_jp: "アル・アハリ", age: 35, caps: 100, goals: 30, height_cm: 179, foot: "左", traits: "左足のカットインとセットプレー。キャプテン。" }
      ]
    },
    {
      id: "austria", name_en: "Austria", name_jp: "オーストリア", flag: "🇦🇹",
      confederation: "UEFA", group: "J", fifa_rank: 22,
      coach: "Ralf Rangnick", nickname_en: "Das Team", nickname_jp: "ダス・チーム",
      note: "ゲーゲンプレスを志向する組織的なチーム。", players: [
        { number: 9, pos: "FW", name_en: "Marko Arnautović", name_jp: "マルコ・アルナウトビッチ", club_en: "Crvena Zvezda", club_jp: "ツルベナ・ズベズダ", age: 37, caps: 120, goals: 40, height_cm: 192, foot: "右", traits: "経験豊富なターゲットマン。" },
        { number: 10, pos: "MF", name_en: "Marcel Sabitzer", name_jp: "マルセル・ザビッツァー", club_en: "Borussia Dortmund", club_jp: "ドルトムント", age: 32, caps: 85, goals: 15, height_cm: 177, foot: "右", traits: "中盤からの飛び出しとミドル。" }
      ]
    },
    {
      id: "jordan", name_en: "Jordan", name_jp: "ヨルダン", flag: "🇯🇴",
      confederation: "AFC", group: "J", fifa_rank: 62,
      coach: "Jamal Sellami", nickname_en: "Al-Nashama", nickname_jp: "アル・ナシャマ",
      note: "悲願の初出場。2023アジアカップ準優勝の勢い。", players: [
        { number: 9, pos: "FW", name_en: "Mousa Al-Taamari", name_jp: "ムサ・アル・タアマリ", club_en: "Montpellier", club_jp: "モンペリエ", age: 28, caps: 65, goals: 20, height_cm: 175, foot: "右", traits: "ドリブルとスピードを武器とするエース。" }
      ]
    },

    /* ===================== GROUP K ===================== */
    {
      id: "portugal", name_en: "Portugal", name_jp: "ポルトガル", flag: "🇵🇹",
      confederation: "UEFA", group: "K", fifa_rank: 6,
      coach: "Roberto Martínez", nickname_en: "A Seleção das Quinas", nickname_jp: "ア・セレソン",
      note: "優勝候補の一角。ロナウドのラストW杯か。", players: [
        { number: 7, pos: "FW", name_en: "Cristiano Ronaldo", name_jp: "クリスティアーノ・ロナウド", club_en: "Al-Nassr", club_jp: "アル・ナスル", age: 41, caps: 220, goals: 140, height_cm: 187, foot: "右", traits: "史上最多得点。空中戦とフィニッシュ、勝負強さ。6度目のW杯へ。" },
        { number: 10, pos: "MF", name_en: "Bruno Fernandes", name_jp: "ブルーノ・フェルナンデス", club_en: "Manchester United", club_jp: "マンチェスター・ユナイテッド", age: 31, caps: 80, goals: 25, height_cm: 179, foot: "右", traits: "創造性とラストパス、得点関与に長けた司令塔。" },
        { number: 23, pos: "MF", name_en: "Vitinha", name_jp: "ヴィティーニャ", club_en: "Paris Saint-Germain", club_jp: "パリ・サンジェルマン", age: 26, caps: 35, goals: 3, height_cm: 172, foot: "右", traits: "中盤の循環を司る技巧派。CL王者の主力。" }
      ]
    },
    {
      id: "congo-dr", name_en: "DR Congo", name_jp: "コンゴ民主共和国", flag: "🇨🇩",
      confederation: "CAF", group: "K", fifa_rank: 60,
      coach: "Sébastien Desabre", nickname_en: "Leopards", nickname_jp: "レオパーズ",
      note: "1974年(ザイール時代)以来の本大会。", players: [
        { number: 11, pos: "FW", name_en: "Yoane Wissa", name_jp: "ヨアヌ・ウィサ", club_en: "Newcastle United", club_jp: "ニューカッスル", age: 29, caps: 25, goals: 8, height_cm: 178, foot: "右", traits: "スピードと決定力を兼ね備えたアタッカー。" }
      ]
    },
    {
      id: "uzbekistan", name_en: "Uzbekistan", name_jp: "ウズベキスタン", flag: "🇺🇿",
      confederation: "AFC", group: "K", fifa_rank: 52,
      coach: "Timur Kapadze", nickname_en: "White Wolves", nickname_jp: "白い狼",
      note: "悲願の初出場。アジアの新勢力。", players: [
        { number: 9, pos: "FW", name_en: "Eldor Shomurodov", name_jp: "エルドル・ショムロドフ", club_en: "Roma", club_jp: "ローマ", age: 31, caps: 75, goals: 40, height_cm: 189, foot: "右", traits: "長身ながら機動力もあるエースFW。" }
      ]
    },
    {
      id: "colombia", name_en: "Colombia", name_jp: "コロンビア", flag: "🇨🇴",
      confederation: "CONMEBOL", group: "K", fifa_rank: 14,
      coach: "Néstor Lorenzo", nickname_en: "Los Cafeteros", nickname_jp: "ロス・カフェテロス",
      note: "タレント豊富な南米の強豪。", players: [
        { number: 10, pos: "MF", name_en: "James Rodríguez", name_jp: "ハメス・ロドリゲス", club_en: "Club León", club_jp: "クラブ・レオン", age: 34, caps: 110, goals: 30, height_cm: 180, foot: "左", traits: "左足の精密なキックと司令塔としての創造性。2014得点王。" },
        { number: 9, pos: "FW", name_en: "Luis Díaz", name_jp: "ルイス・ディアス", club_en: "Bayern Munich", club_jp: "バイエルン・ミュンヘン", age: 29, caps: 60, goals: 20, height_cm: 178, foot: "右", traits: "切れ味鋭いドリブルと得点力を持つ左ウインガー。" }
      ]
    },

    /* ===================== GROUP L ===================== */
    {
      id: "england", name_en: "England", name_jp: "イングランド", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      confederation: "UEFA", group: "L", fifa_rank: 4,
      coach: "Thomas Tuchel", nickname_en: "Three Lions", nickname_jp: "スリー・ライオンズ",
      note: "近年連続して決勝・準決勝。悲願のタイトルへ。", players: [
        { number: 10, pos: "MF", name_en: "Jude Bellingham", name_jp: "ジュード・ベリンガム", club_en: "Real Madrid", club_jp: "レアル・マドリード", age: 22, caps: 45, goals: 8, height_cm: 186, foot: "右", traits: "攻守に万能なスーパースター。ボックス侵入と得点力、統率力。" },
        { number: 9, pos: "FW", name_en: "Harry Kane", name_jp: "ハリー・ケイン", club_en: "Bayern Munich", club_jp: "バイエルン・ミュンヘン", age: 32, caps: 105, goals: 70, height_cm: 188, foot: "右", traits: "歴代最多得点のキャプテン。ポスト、決定力、ロングパス。" },
        { number: 7, pos: "FW", name_en: "Bukayo Saka", name_jp: "ブカヨ・サカ", club_en: "Arsenal", club_jp: "アーセナル", age: 24, caps: 45, goals: 12, height_cm: 178, foot: "左", traits: "右サイドのカットインと運動量、ゴール関与。" }
      ]
    },
    {
      id: "croatia", name_en: "Croatia", name_jp: "クロアチア", flag: "🇭🇷",
      confederation: "UEFA", group: "L", fifa_rank: 11,
      coach: "Zlatko Dalić", nickname_en: "Vatreni (Blazers)", nickname_jp: "ヴァトレニ",
      note: "2018準優勝・2022年3位。中盤の質が高い。", players: [
        { number: 10, pos: "MF", name_en: "Luka Modrić", name_jp: "ルカ・モドリッチ", club_en: "AC Milan", club_jp: "ACミラン", age: 40, caps: 185, goals: 27, height_cm: 172, foot: "右", traits: "稀代の名手。卓越したパスとゲームメイク、ラストW杯か。" }
      ]
    },
    {
      id: "ghana", name_en: "Ghana", name_jp: "ガーナ", flag: "🇬🇭",
      confederation: "CAF", group: "L", fifa_rank: 73,
      coach: "Otto Addo", nickname_en: "Black Stars", nickname_jp: "ブラック・スターズ",
      note: "", players: [
        { number: 8, pos: "MF", name_en: "Thomas Partey", name_jp: "トーマス・パーティ", club_en: "Villarreal", club_jp: "ビジャレアル", age: 32, caps: 55, goals: 14, height_cm: 185, foot: "右", traits: "守備力と推進力を兼備したボランチ。" },
        { number: 10, pos: "FW", name_en: "Mohammed Kudus", name_jp: "モハメド・クドゥス", club_en: "Tottenham", club_jp: "トッテナム", age: 25, caps: 40, goals: 10, height_cm: 177, foot: "両", traits: "ドリブルとシュートを兼ね備えた万能アタッカー。" }
      ]
    },
    {
      id: "panama", name_en: "Panama", name_jp: "パナマ", flag: "🇵🇦",
      confederation: "CONCACAF", group: "L", fifa_rank: 31,
      coach: "Thomas Christiansen", nickname_en: "Los Canaleros", nickname_jp: "ロス・カナレロス",
      note: "2018年以来2度目の出場。", players: [
        { number: 20, pos: "MF", name_en: "Aníbal Godoy", name_jp: "アニバル・ゴドイ", club_en: "San Jose Earthquakes", club_jp: "サンノゼ・アースクエイクス", age: 36, caps: 130, goals: 5, height_cm: 178, foot: "右", traits: "中盤の経験豊富な舵取り役。" }
      ]
    }
  ]
};
