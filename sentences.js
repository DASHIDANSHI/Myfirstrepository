/* ===========================================================================
 * sentences.js — デフォルト文章セット / カテゴリ / 場面タグ / 文化メモ
 *
 * 追加・修正のしかた:
 *   RAW の各カテゴリ配列に ["English", "日本語", ["場面タグ", ...]] を足すだけ。
 *   場面タグは省略可(第3要素なし)。
 *   id は「d-<カテゴリ>-<連番>」で自動採番される。
 *   ★注意: 既存の行を配列の途中に挿入すると以降の id がずれ、学習進捗の
 *     ひもづけが変わってしまう。追加は各カテゴリ配列の「末尾」に行うこと。
 *
 *   CATEGORY_ORDER の並び順が、そのまま新規学習の出題順(カリキュラム順)。
 * ======================================================================== */

var CATEGORIES = {
  listen:     { label: "聞き返し・確認",     short: "聞き返し", priority: 3 },
  intro:      { label: "自己紹介・名前",     short: "自己紹介", priority: 3 },
  ask:        { label: "質問・依頼",         short: "質問依頼", priority: 2 },
  opinion:    { label: "意見・賛成・反対",   short: "意見",     priority: 3 },
  teamwork:   { label: "提案・役割分担",     short: "チーム",   priority: 3 },
  party:      { label: "懇親会・パーティ",   short: "懇親会",   priority: 3 },
  smalltalk:  { label: "雑談・文化の話題",   short: "雑談",     priority: 2 },
  report:     { label: "進捗報告・発表",     short: "発表",     priority: 2 },
  facilitate: { label: "会議進行・トラブル", short: "進行",     priority: 1 },
  custom:     { label: "自分で追加",         short: "追加",     priority: 2 }
};

/* 新規学習の出題順 = 8週間カリキュラムの順序(DESIGN.md §5.2) */
var CATEGORY_ORDER = [
  "listen", "intro", "ask", "opinion", "teamwork",
  "party", "smalltalk", "report", "facilitate"
];

var SCENES = {
  "morning":         "朝の挨拶",
  "discussion":      "議論",
  "presentation":    "発表",
  "break":           "休憩",
  "trouble":         "トラブル",
  "party-join":      "懇親会 > 輪に入る",
  "party-toast":     "懇親会 > 乾杯・注文",
  "party-nodrink":   "懇親会 > 飲まない選択",
  "party-food":      "懇親会 > 食べ物の話",
  "party-know":      "懇親会 > 相手を知る",
  "party-react":     "懇親会 > 盛り上げる",
  "party-contact":   "懇親会 > 連絡先交換",
  "party-leave":     "懇親会 > 切り上げる",
  "party-reunion":   "懇親会 > 翌朝の再会",
  "party-farewell":  "懇親会 > 最終日の別れ"
};

/* 研修3日間、その日の朝に流し見する場面(本番中モード) */
var TRAINING_DAY_FOCUS = [
  { day: 1, label: "初日: 初対面と自己紹介", scenes: ["party-join"], categories: ["intro", "listen"] },
  { day: 2, label: "2日目: 再会と議論",       scenes: ["party-reunion"], categories: ["opinion", "teamwork"] },
  { day: 3, label: "最終日: 発表と別れ",       scenes: ["party-farewell"], categories: ["report"] }
];

var RAW = {

/* ------------------------------------------------------------------ *
 * 1. 聞き返し・確認  ★★★
 *    研修・懇親会の両方で最も高頻度。詰まった時の保険。
 * ------------------------------------------------------------------ */
listen: [
  ["Sorry, could you say that again?", "すみません、もう一度言っていただけますか?", ["discussion"]],
  ["Could you repeat that, please?", "もう一度お願いできますか?", ["discussion"]],
  ["Sorry, I didn't catch that.", "すみません、聞き取れませんでした。", ["discussion"]],
  ["Could you speak a little more slowly, please?", "もう少しゆっくり話していただけますか?", ["discussion"]],
  ["It's a bit noisy in here — could you speak up?", "少しうるさいので、もう少し大きな声でお願いできますか?", ["party-join"]],
  ["Sorry, I missed the last part.", "すみません、最後のところを聞き逃しました。", ["discussion"]],
  ["Could you say that one more time? I want to make sure I got it.", "もう一度言ってもらえますか?ちゃんと理解したいので。", ["discussion"]],
  ["Do you mean we should finish it by tomorrow?", "明日までに終わらせるべき、ということですか?", ["discussion"]],
  ["So, if I understand correctly, you want us to start with the survey.", "正しく理解できていれば、まず調査から始めるということですね。", ["discussion"]],
  ["Let me make sure I understand.", "理解できているか確認させてください。", ["discussion"]],
  ["Just to confirm, the deadline is Friday, right?", "確認ですが、締め切りは金曜日ですよね?", ["discussion"]],
  ["Could you explain that in another way?", "別の言い方で説明していただけますか?", ["discussion"]],
  ["Sorry, what does that mean?", "すみません、それはどういう意味ですか?", ["discussion"]],
  ["What do you mean by “stakeholder”?", "「ステークホルダー」とはどういう意味ですか?", ["discussion"]],
  ["Could you spell that for me?", "スペルを教えていただけますか?", ["discussion"]],
  ["How do you spell that?", "それはどうつづりますか?", ["discussion"]],
  ["Sorry, I'm not following you.", "すみません、話についていけていません。", ["discussion"]],
  ["I'm a little lost. Could we go back a bit?", "少しわからなくなりました。少し戻ってもいいですか?", ["discussion"]],
  ["Could you give me a moment? I'm still processing that.", "少し時間をください。まだ理解している途中です。", ["discussion"]],
  ["Sorry, my English isn't perfect. Could you be patient with me?", "すみません、英語が完璧ではないので、少し待っていただけますか?", ["discussion"]],
  ["Sorry, could you slow down a little? I want to follow you.", "少しゆっくりお願いできますか?ついていきたいので。", ["discussion"]],
  ["Is that a yes or a no?", "それは「はい」ですか、「いいえ」ですか?", ["discussion"]],
  ["Sorry, who are you asking?", "すみません、どなたに聞いていますか?", ["discussion"]],
  ["Are you asking me?", "私に聞いていますか?", ["discussion"]],
  ["Sorry, I didn't hear the number. Was it fifteen or fifty?", "数字が聞き取れませんでした。15ですか、50ですか?", ["discussion"]],
  ["Could you write it down for me?", "書いていただけますか?", ["discussion"]],
  ["Could you put that in the chat?", "チャットに書いていただけますか?", ["discussion"]],
  ["I think I understand, but let me repeat it back to you.", "理解できたと思いますが、確認のため繰り返させてください。", ["discussion"]],
  ["You said we need three volunteers, right?", "3人の志願者が必要、ということでしたよね?", ["discussion"]],
  ["Sorry, I lost you at the last point.", "すみません、最後の点でわからなくなりました。", ["discussion"]],
  ["Can I check one thing?", "一つ確認してもいいですか?", ["discussion"]],
  ["Sorry, is this the right room?", "すみません、この部屋で合っていますか?", ["morning"]],
  ["Sorry, I couldn't hear you. There's some background noise.", "聞こえませんでした。周りの音が入っていて。", ["party-join"]],
  ["Could you come a little closer? It's hard to hear.", "少し近くに来ていただけますか?聞き取りづらくて。", ["party-join"]],
  ["Sorry, could you say the last word again?", "すみません、最後の単語をもう一度お願いします。", ["discussion"]],
  ["I want to make sure we're on the same page.", "認識を合わせておきたいです。", ["discussion"]],
  ["Am I understanding this right?", "私の理解は合っていますか?", ["discussion"]],
  ["Sorry, I'm not sure I got your point.", "すみません、要点がつかめませんでした。", ["discussion"]],
  ["Could you summarize that for me?", "まとめていただけますか?", ["discussion"]],
  ["Sorry, one second — what was the second point?", "すみません、少し待ってください。2つ目の点は何でしたか?", ["discussion"]],
  ["Thanks, that's much clearer now.", "ありがとうございます、よくわかりました。", ["discussion"]],
  ["Got it, thank you.", "わかりました、ありがとうございます。", ["discussion"]],
  ["Ah, I see what you mean now.", "ああ、おっしゃる意味がわかりました。", ["discussion"]],
  ["Sorry to make you repeat yourself.", "何度も言わせてしまってすみません。", ["discussion"]],
  ["Sorry, could you use simpler words? My English is still improving.", "もう少し簡単な言葉でお願いできますか?英語を勉強中なので。", ["discussion"]]
],

/* ------------------------------------------------------------------ *
 * 2. 自己紹介・名前  ★★★
 *    50人規模。自己紹介と名前のやり取りは数十回発生する。
 * ------------------------------------------------------------------ */
intro: [
  ["Hi, I'm Kenji. Nice to meet you.", "こんにちは、ケンジです。はじめまして。", ["morning", "party-join"]],
  ["Nice to meet you too.", "こちらこそ、はじめまして。", ["morning", "party-join"]],
  ["I'm from the Tokyo office.", "東京オフィスから来ました。", ["morning"]],
  ["I work in the marketing team.", "マーケティングチームで働いています。", ["morning"]],
  ["I'm in charge of product planning.", "商品企画を担当しています。", ["morning"]],
  ["I've been with the company for six years.", "入社して6年になります。", ["morning"]],
  ["I joined the company last year.", "昨年入社しました。", ["morning"]],
  ["This is my first time at this training.", "この研修は初めてです。", ["morning"]],
  ["Sorry, could I get your name again?", "すみません、もう一度お名前を伺えますか?", ["morning", "party-join"]],
  ["How do you pronounce your name?", "お名前はどう発音しますか?", ["morning", "party-join"]],
  ["Did I say your name correctly?", "お名前、正しく言えていましたか?", ["party-join"]],
  ["Sorry, I'm not sure I'm saying it right.", "すみません、正しく言えているか自信がありません。", ["party-join"]],
  ["Please call me Ken.", "ケンと呼んでください。", ["morning"]],
  ["My name is hard to pronounce, so just call me Kei.", "名前が言いにくいので、ケイと呼んでください。", ["morning"]],
  ["What should I call you?", "何とお呼びすればいいですか?", ["party-join"]],
  ["Do you go by a nickname?", "ニックネームはありますか?", ["party-join"]],
  ["Where are you from?", "どちらのご出身ですか?", ["party-know"]],
  ["Which office are you based in?", "どのオフィスの所属ですか?", ["party-know"]],
  ["Oh, you're from Jakarta! How's the weather there now?", "ジャカルタから!今の天気はどうですか?", ["party-know"]],
  ["What team are you on?", "どのチームですか?", ["party-know"]],
  ["What do you do at your office?", "オフィスではどんな仕事をしていますか?", ["party-know"]],
  ["How long have you been with the company?", "勤続何年ですか?", ["party-know"]],
  ["Nice to be working with you.", "ご一緒できてうれしいです。", ["discussion"]],
  ["I'm looking forward to working with you.", "一緒に働けるのを楽しみにしています。", ["discussion"]],
  ["Let me introduce myself.", "自己紹介させてください。", ["morning"]],
  ["Let me introduce my colleague, Yuki.", "同僚のユキを紹介します。", ["party-join"]],
  ["Have you two met?", "お二人は面識がありますか?", ["party-join"]],
  ["This is Wei, from the Shanghai office.", "こちらはウェイさん、上海オフィスの方です。", ["party-join"]],
  ["How was your flight?", "フライトはいかがでしたか?", ["party-know"]],
  ["When did you arrive?", "いつ到着しましたか?", ["party-know"]],
  ["Is this your first time in Japan?", "日本は初めてですか?", ["party-know"]],
  ["How are you finding the training so far?", "ここまでの研修はいかがですか?", ["break"]],
  ["Are you enjoying it so far?", "ここまで楽しめていますか?", ["break"]],
  ["Sorry, I'm bad with names. Could you remind me?", "すみません、名前を覚えるのが苦手で。もう一度教えていただけますか?", ["party-reunion"]],
  ["We met yesterday, right? You're Priya.", "昨日お会いしましたよね。プリヤさんですね。", ["party-reunion"]],
  ["I don't think we've met yet. I'm Kenji.", "まだお会いしていませんよね。ケンジです。", ["party-join"]],
  ["It's nice to finally meet you in person.", "ようやく直接お会いできてうれしいです。", ["party-join"]],
  ["I've heard a lot about you.", "お噂はかねがね伺っています。", ["party-join"]],
  ["What brought you to this training?", "どういう経緯でこの研修に参加を?", ["party-know"]],
  ["I hope I can learn a lot from everyone here.", "ここで皆さんからたくさん学べたらと思います。", ["morning"]],
  ["My English is still a work in progress, so please bear with me.", "英語はまだ勉強中なので、ご容赦ください。", ["morning"]],
  ["Feel free to correct my English anytime.", "英語はいつでも直してください。", ["discussion"]],
  ["Could you write your name here?", "ここにお名前を書いていただけますか?", ["discussion"]],
  ["Nice to see you again.", "またお会いできてうれしいです。", ["party-reunion"]],
  ["I'll be working with you in Group B.", "Bグループでご一緒します。", ["discussion"]]
],

/* ------------------------------------------------------------------ *
 * 3. 質問・依頼  ★★
 * ------------------------------------------------------------------ */
ask: [
  ["Could you give me an example?", "例を挙げていただけますか?", ["discussion"]],
  ["Can I ask a question?", "質問してもいいですか?", ["discussion"]],
  ["I have a quick question.", "一つ手短に質問があります。", ["discussion"]],
  ["Would you mind sharing your screen?", "画面を共有していただけますか?", ["discussion"]],
  ["Could you send me the slides later?", "後でスライドを送っていただけますか?", ["discussion"]],
  ["Do you have a minute?", "少しお時間ありますか?", ["break"]],
  ["Could you help me with this?", "これを手伝っていただけますか?", ["discussion"]],
  ["Would it be possible to get the file today?", "今日そのファイルをいただくことは可能ですか?", ["discussion"]],
  ["Could I borrow your pen?", "ペンをお借りできますか?", ["discussion"]],
  ["Can I take a photo of the whiteboard?", "ホワイトボードの写真を撮ってもいいですか?", ["discussion"]],
  ["Is it okay if I record this session?", "このセッションを録音してもいいですか?", ["discussion"]],
  ["Where can I find the material?", "資料はどこにありますか?", ["morning"]],
  ["Who should I ask about this?", "これは誰に聞けばいいですか?", ["discussion"]],
  ["What time do we start tomorrow?", "明日は何時開始ですか?", ["break"]],
  ["Where's the restroom?", "お手洗いはどこですか?", ["break"]],
  ["Is there Wi-Fi here? Could I get the password?", "ここはWi-Fiがありますか?パスワードを教えてください。", ["morning"]],
  ["Could you show me how to do it?", "やり方を見せていただけますか?", ["discussion"]],
  ["Do you know where Group C is meeting?", "Cグループがどこに集まるか知っていますか?", ["break"]],
  ["Sorry to bother you, but could you check this?", "お忙しいところすみませんが、これを確認していただけますか?", ["discussion"]],
  ["Would you mind if I joined your group?", "あなたのグループに入ってもいいですか?", ["discussion"]],
  ["Could we talk about this after the session?", "セッションの後にこの件を話せますか?", ["break"]],
  ["May I use this seat?", "この席を使ってもいいですか?", ["morning"]],
  ["Could you explain the task one more time?", "課題をもう一度説明していただけますか?", ["discussion"]],
  ["What's the deadline for this?", "これの締め切りはいつですか?", ["discussion"]],
  ["How much time do we have?", "時間はどれくらいありますか?", ["discussion"]],
  ["Do we need to present this?", "これは発表する必要がありますか?", ["discussion"]],
  ["Should we write it in English?", "英語で書いた方がいいですか?", ["discussion"]],
  ["Can you give me a hand with the setup?", "準備を手伝ってもらえますか?", ["discussion"]],
  ["Is there anything I can help with?", "何か手伝えることはありますか?", ["discussion"]],
  ["Let me know if you need anything.", "何か必要でしたら言ってください。", ["discussion"]],
  ["Could you double-check this for me?", "これを確認していただけますか?", ["discussion"]],
  ["Do you happen to know the schedule for tomorrow?", "明日の予定をご存じですか?", ["break"]],
  ["Would you mind repeating the instructions?", "指示をもう一度お願いできますか?", ["discussion"]],
  ["Is it okay to ask questions during the session?", "セッション中に質問してもいいですか?", ["discussion"]],
  ["Thanks a lot. I really appreciate it.", "どうもありがとうございます。本当に助かります。", ["discussion"]]
],

/* ------------------------------------------------------------------ *
 * 4. 意見・賛成・反対  ★★★
 * ------------------------------------------------------------------ */
opinion: [
  ["I think we should start with the customer data.", "まず顧客データから始めるべきだと思います。", ["discussion"]],
  ["In my opinion, this is the fastest way.", "私の意見では、これが一番早い方法です。", ["discussion"]],
  ["I feel that we need more time.", "もう少し時間が必要だと感じます。", ["discussion"]],
  ["From my experience, that usually works well.", "私の経験では、それはたいていうまくいきます。", ["discussion"]],
  ["The reason I say that is that our users are mostly beginners.", "そう言う理由は、利用者のほとんどが初心者だからです。", ["discussion"]],
  ["That's a good point.", "いい指摘ですね。", ["discussion"]],
  ["I agree with you.", "同意します。", ["discussion"]],
  ["I completely agree.", "まったく同感です。", ["discussion"]],
  ["Exactly. That's what I was thinking.", "まさに。私もそう考えていました。", ["discussion"]],
  ["That makes sense to me.", "納得できます。", ["discussion"]],
  ["I'm with you on that.", "その点は同じ考えです。", ["discussion"]],
  ["I like that idea.", "そのアイデアはいいですね。", ["discussion"]],
  ["I see it a little differently.", "私は少し違う見方をしています。", ["discussion"]],
  ["I'm not sure I agree.", "賛成できるか自信がありません。", ["discussion"]],
  ["I see your point, but I have a concern.", "おっしゃることはわかりますが、気になる点があります。", ["discussion"]],
  ["That could work, but it might take too long.", "それでもいけそうですが、時間がかかりすぎるかもしれません。", ["discussion"]],
  ["I'd rather focus on the first option.", "どちらかというと最初の案に集中したいです。", ["discussion"]],
  ["Can I offer a different view?", "別の見方を提示してもいいですか?", ["discussion"]],
  ["I'm afraid I don't think that will work.", "残念ながら、それはうまくいかないと思います。", ["discussion"]],
  ["I understand, but let's consider the cost.", "わかりますが、コストも考えましょう。", ["discussion"]],
  ["That's true, but there's another side to it.", "それは事実ですが、別の側面もあります。", ["discussion"]],
  ["What do you think?", "どう思いますか?", ["discussion"]],
  ["How do you feel about this?", "これについてどう思いますか?", ["discussion"]],
  ["Does anyone have another idea?", "他にアイデアのある方はいますか?", ["discussion"]],
  ["What's your take on this?", "この件についてのお考えは?", ["discussion"]],
  ["I'd like to hear from Priya.", "プリヤさんの意見を聞きたいです。", ["discussion"]],
  ["We haven't heard from you yet — what do you think?", "まだ聞けていませんが、どう思いますか?", ["discussion"]],
  ["Could I add something?", "一つ付け加えてもいいですか?", ["discussion"]],
  ["Can I jump in here?", "ここで発言してもいいですか?", ["discussion"]],
  ["Just to build on that point, we could also ask the users directly.", "その点に付け加えると、直接ユーザーに聞くこともできます。", ["discussion"]],
  ["I'd like to go back to what Wei said.", "ウェイさんが言ったことに戻りたいです。", ["discussion"]],
  ["I'm on the fence about this.", "この件はまだ決めかねています。", ["discussion"]],
  ["I don't have a strong opinion either way.", "どちらでも強いこだわりはありません。", ["discussion"]],
  ["Either way works for me.", "どちらでも大丈夫です。", ["discussion"]],
  ["I'm happy to go with the group.", "みなさんに合わせます。", ["discussion"]],
  ["Let's hear both sides first.", "まず両方の意見を聞きましょう。", ["discussion"]],
  ["Sorry, I need a moment to think.", "すみません、少し考える時間をください。", ["discussion"]],
  ["That's a difficult question.", "それは難しい質問ですね。", ["discussion"]],
  ["I hadn't thought of that.", "それは考えていませんでした。", ["discussion"]],
  ["Good idea — I hadn't considered that angle.", "いいアイデアですね。その視点は考えていませんでした。", ["discussion"]],
  ["So we all agree on the first option?", "では全員が第一案に賛成ということですね?", ["discussion"]],
  ["Are we all okay with this?", "これで全員よろしいですか?", ["discussion"]],
  ["Let's put that aside for now.", "それはいったん保留にしましょう。", ["discussion"]],
  ["Maybe we can come back to that later.", "それは後で戻ってきましょう。", ["discussion"]],
  ["I partly agree, but I think the timeline is too tight.", "部分的には賛成ですが、スケジュールが厳しすぎると思います。", ["discussion"]],
  ["To be honest, I'm a bit worried about that.", "正直に言うと、その点が少し心配です。", ["discussion"]],
  ["It depends on the situation.", "状況によります。", ["discussion"]],
  ["That's exactly the problem.", "まさにそこが問題です。", ["discussion"]],
  ["Could you tell me more about that?", "それについてもう少し教えてください。", ["discussion"]],
  ["Why do you think so?", "なぜそう思いますか?", ["discussion"]]
],

/* ------------------------------------------------------------------ *
 * 5. 提案・役割分担(グループワーク)  ★★★
 * ------------------------------------------------------------------ */
teamwork: [
  ["Why don't we start with the timeline?", "まずスケジュールから始めませんか?", ["discussion"]],
  ["How about we split into two groups?", "2つのグループに分かれるのはどうですか?", ["discussion"]],
  ["Shall we split the tasks?", "タスクを分担しましょうか?", ["discussion"]],
  ["Let's divide the work.", "作業を分担しましょう。", ["discussion"]],
  ["I can take care of the slides.", "スライドは私が担当できます。", ["discussion"]],
  ["I'd be happy to do the research part.", "調査の部分は喜んで引き受けます。", ["discussion"]],
  ["Would you like to take the introduction?", "導入部分を担当しませんか?", ["discussion"]],
  ["Who wants to present?", "誰が発表しますか?", ["discussion"]],
  ["Should I take notes?", "私がメモを取りましょうか?", ["discussion"]],
  ["I'll write it on the whiteboard.", "ホワイトボードに書きます。", ["discussion"]],
  ["Let me summarize what we have so far.", "ここまでの内容をまとめます。", ["discussion"]],
  ["So, our plan is to interview five users.", "つまり、5人のユーザーにインタビューする計画ですね。", ["discussion"]],
  ["Are we clear on who does what?", "誰が何をするか、はっきりしていますか?", ["discussion"]],
  ["What's our next step?", "次のステップは何ですか?", ["discussion"]],
  ["How much time do we have left?", "残り時間はどれくらいですか?", ["discussion"]],
  ["We have ten minutes left.", "残り10分です。", ["discussion"]],
  ["Let's keep an eye on the time.", "時間に気をつけましょう。", ["discussion"]],
  ["Maybe we should move on to the next point.", "次の点に進んだ方がいいかもしれません。", ["discussion"]],
  ["Let's decide this first.", "まずこれを決めましょう。", ["discussion"]],
  ["Can we vote on it?", "多数決で決めませんか?", ["discussion"]],
  ["Let's go with the second idea.", "2つ目の案でいきましょう。", ["discussion"]],
  ["Is everyone comfortable with that?", "全員それでいいですか?", ["discussion"]],
  ["Does that work for everyone?", "皆さんそれで大丈夫ですか?", ["discussion"]],
  ["Let's make sure everyone gets a chance to speak.", "全員が発言できるようにしましょう。", ["discussion"]],
  ["What do you think, Min-ji?", "ミンジさんはどう思いますか?", ["discussion"]],
  ["Sorry, I think you were about to say something.", "すみません、何か言いかけていましたよね。", ["discussion"]],
  ["Go ahead, please.", "どうぞ、お先に。", ["discussion"]],
  ["Sorry, you go first.", "すみません、お先にどうぞ。", ["discussion"]],
  ["Should we ask the facilitator?", "ファシリテーターに聞いてみましょうか?", ["discussion"]],
  ["I'm not sure we're on the right track.", "正しい方向に進んでいるか自信がありません。", ["discussion"]],
  ["Let's go back to the question.", "課題に立ち返りましょう。", ["discussion"]],
  ["Can we finish this part in five minutes?", "この部分を5分で終えられますか?", ["discussion"]],
  ["I'll put everything together.", "私が全部まとめます。", ["discussion"]],
  ["Could you send me your part by tonight?", "あなたの担当分を今夜までに送ってもらえますか?", ["discussion"]],
  ["I'll share the file with everyone.", "ファイルを全員に共有します。", ["discussion"]],
  ["Let's meet again after the break.", "休憩の後にまた集まりましょう。", ["break"]],
  ["Where should we meet?", "どこに集まりましょうか?", ["break"]],
  ["Let's exchange contacts so we can share files.", "ファイルを共有できるよう連絡先を交換しましょう。", ["discussion"]],
  ["Nice work, everyone.", "みなさん、お疲れさまでした。", ["discussion"]],
  ["Great teamwork today.", "今日はいいチームワークでした。", ["discussion"]],
  ["Thanks for pulling this together.", "まとめてくれてありがとう。", ["discussion"]],
  ["Sorry, I need a little more time.", "すみません、もう少し時間が必要です。", ["discussion"]],
  ["Could someone help me with this part?", "この部分を誰か手伝ってもらえますか?", ["discussion"]],
  ["I'm not confident about my English, but I'll try.", "英語に自信はありませんが、やってみます。", ["discussion"]],
  ["Let's support each other.", "お互いに助け合いましょう。", ["discussion"]]
],

/* ------------------------------------------------------------------ *
 * 6. 懇親会・パーティ  ★★★
 *    3日間開催: 初日=輪に入る / 2日目=再会 / 最終日=別れ
 * ------------------------------------------------------------------ */
party: [
  ["Mind if I join you?", "ご一緒してもいいですか?", ["party-join"]],
  ["Is this seat taken?", "この席は空いていますか?", ["party-join"]],
  ["Do you mind if I sit here?", "ここに座ってもいいですか?", ["party-join"]],
  ["Hi, I don't think we've met. I'm Kenji.", "こんにちは、まだお会いしていませんよね。ケンジです。", ["party-join"]],
  ["Can I join the conversation?", "会話に入ってもいいですか?", ["party-join"]],
  ["What are you all talking about?", "みなさん何の話をしているんですか?", ["party-join"]],
  ["Sorry to interrupt — are you from the Sydney office?", "お話中すみません、シドニーオフィスの方ですか?", ["party-join"]],
  ["Cheers!", "乾杯!", ["party-toast"]],
  ["Let's make a toast.", "乾杯しましょう。", ["party-toast"]],
  ["Here's to a great training!", "素晴らしい研修に乾杯!", ["party-toast"]],
  ["What are you having?", "何を飲んでいますか?", ["party-toast"]],
  ["What do you usually drink?", "普段は何を飲みますか?", ["party-toast"]],
  ["Can I get you a drink?", "何か飲み物を取ってきましょうか?", ["party-toast"]],
  ["I'll get the next round.", "次は私が持ってきます。", ["party-toast"]],
  ["Would you like another one?", "もう一杯いかがですか?", ["party-toast"]],
  ["This one's really good. You should try it.", "これ、すごくおいしいですよ。試してみてください。", ["party-toast"]],
  ["I'm good with soda, thanks.", "私はソーダで大丈夫です、ありがとう。", ["party-nodrink"]],
  ["I don't drink, but I love the atmosphere.", "お酒は飲みませんが、この雰囲気が好きです。", ["party-nodrink"]],
  ["I'll stick to orange juice tonight.", "今夜はオレンジジュースにしておきます。", ["party-nodrink"]],
  ["No alcohol for me, thanks.", "お酒は結構です、ありがとう。", ["party-nodrink"]],
  ["Is there anything non-alcoholic?", "ノンアルコールのものはありますか?", ["party-nodrink"]],
  ["Please don't worry about me — enjoy yours.", "私のことは気にせず、どうぞ楽しんでください。", ["party-nodrink"]],
  ["Do you drink, or would you prefer something else?", "お酒は飲みますか?それとも別のものがいいですか?", ["party-nodrink"]],
  ["Have you tried this yet?", "これはもう食べましたか?", ["party-food"]],
  ["You should try this — it's a Japanese classic.", "これを試してみてください。日本の定番です。", ["party-food"]],
  ["Is there anything you don't eat?", "食べられないものはありますか?", ["party-food"]],
  ["Do you have any dietary restrictions?", "食事の制限はありますか?", ["party-food"]],
  ["This one has pork in it, just so you know.", "これは豚肉が入っています、念のため。", ["party-food"]],
  ["There's a vegetarian option over there.", "あちらにベジタリアン向けのものがあります。", ["party-food"]],
  ["What's your favorite food from your country?", "ご自身の国で一番好きな食べ物は何ですか?", ["party-food"]],
  ["How do you like Japanese food?", "日本の食べ物はいかがですか?", ["party-food"]],
  ["Where are you based?", "どちらにお住まいですか?", ["party-know"]],
  ["What do you do outside work?", "仕事以外では何をしていますか?", ["party-know"]],
  ["Do you have any hobbies?", "趣味はありますか?", ["party-know"]],
  ["How long have you been in your current role?", "今の役割になってどれくらいですか?", ["party-know"]],
  ["What's your hometown like?", "ご出身はどんなところですか?", ["party-know"]],
  ["Have you been to Japan before?", "日本に来たことはありますか?", ["party-know"]],
  ["How's the training going for you?", "研修はいかがですか?", ["party-know"]],
  ["Which session did you like the most?", "どのセッションが一番よかったですか?", ["party-know"]],
  ["Do you travel a lot for work?", "仕事でよく出張しますか?", ["party-know"]],
  ["What's the best thing about working in your office?", "あなたのオフィスで働くことの一番いいところは何ですか?", ["party-know"]],
  ["No way!", "まさか!", ["party-react"]],
  ["That's amazing.", "それはすごいですね。", ["party-react"]],
  ["Really? Tell me more.", "本当ですか?もっと聞かせてください。", ["party-react"]],
  ["That's so interesting.", "それはとても興味深いです。", ["party-react"]],
  ["I know what you mean.", "わかります。", ["party-react"]],
  ["Same here!", "私も同じです!", ["party-react"]],
  ["Good one!", "うまいですね!(冗談への反応)", ["party-react"]],
  ["That sounds tough.", "それは大変ですね。", ["party-react"]],
  ["Wow, I had no idea.", "へえ、まったく知りませんでした。", ["party-react"]],
  ["Sorry, I didn't get the joke — could you explain?", "すみません、冗談がわかりませんでした。説明してもらえますか?", ["party-react"]],
  ["Are you on LinkedIn?", "LinkedInはやっていますか?", ["party-contact"]],
  ["Let's keep in touch.", "連絡を取り合いましょう。", ["party-contact"]],
  ["Could I get your contact?", "連絡先を教えてもらえますか?", ["party-contact"]],
  ["Let me give you my email.", "メールアドレスをお伝えします。", ["party-contact"]],
  ["Feel free to reach out anytime.", "いつでも気軽に連絡してください。", ["party-contact"]],
  ["I'll grab another drink — catch you later.", "もう一杯取ってきます。またあとで。", ["party-leave"]],
  ["It was great talking to you.", "お話しできてよかったです。", ["party-leave"]],
  ["I should say hi to a few more people. Talk to you later.", "何人かに挨拶してきます。またあとで。", ["party-leave"]],
  ["I'm going to head back to the hotel. Good night!", "ホテルに戻ります。おやすみなさい!", ["party-leave"]],
  ["Good to see you again!", "またお会いできてうれしいです!", ["party-reunion"]],
  ["How was the rest of your night?", "あのあとの夜はどうでしたか?", ["party-reunion"]],
  ["Did you sleep well?", "よく眠れましたか?", ["party-reunion"]],
  ["You were right about that restaurant — it was great.", "あのレストラン、おっしゃる通りでした。よかったです。", ["party-reunion"]],
  ["How are you feeling this morning?", "今朝は体調どうですか?", ["party-reunion"]],
  ["It was great meeting you all.", "皆さんにお会いできてよかったです。", ["party-farewell"]],
  ["Have a safe trip home.", "気をつけてお帰りください。", ["party-farewell"]],
  ["I hope we can work together again.", "また一緒に仕事ができるといいですね。", ["party-farewell"]],
  ["Let me know if you ever come to Tokyo.", "東京に来ることがあれば教えてください。", ["party-farewell"]],
  ["Thanks for everything. See you next time.", "いろいろありがとうございました。またお会いしましょう。", ["party-farewell"]]
],

/* ------------------------------------------------------------------ *
 * 7. 雑談・文化の話題  ★★
 * ------------------------------------------------------------------ */
smalltalk: [
  ["How's it going?", "調子はどうですか?", ["break"]],
  ["How was your day?", "今日はどうでしたか?", ["party-know"]],
  ["Long day, isn't it?", "長い一日ですね。", ["break"]],
  ["The weather is nice today.", "今日はいい天気ですね。", ["break"]],
  ["It's really hot in Tokyo this time of year.", "この時期の東京は本当に暑いです。", ["break"]],
  ["How's the weather in Sydney now?", "今シドニーの天気はどうですか?", ["party-know"]],
  ["Do you follow any sports?", "何かスポーツは見ますか?", ["party-know"]],
  ["Did you watch the game last night?", "昨夜の試合を見ましたか?", ["party-know"]],
  ["What kind of music do you like?", "どんな音楽が好きですか?", ["party-know"]],
  ["Have you seen any good movies lately?", "最近いい映画を見ましたか?", ["party-know"]],
  ["Do you watch any Japanese shows?", "日本の番組は見ますか?", ["party-know"]],
  ["What's popular in your country right now?", "今あなたの国で流行っているものは何ですか?", ["party-know"]],
  ["What should I see if I visit Taipei?", "台北に行くなら何を見るべきですか?", ["party-know"]],
  ["I'd love to visit someday.", "いつか訪れてみたいです。", ["party-know"]],
  ["How long is the flight from Jakarta?", "ジャカルタからのフライトはどれくらいですか?", ["party-know"]],
  ["Is this your first time in Tokyo?", "東京は初めてですか?", ["party-know"]],
  ["Have you had time to look around the city?", "街を見て回る時間はありましたか?", ["party-know"]],
  ["If you have time, Asakusa is worth visiting.", "時間があれば、浅草はおすすめです。", ["party-know"]],
  ["What's the food like in your hometown?", "ご出身の食べ物はどんな感じですか?", ["party-food"]],
  ["Have you tried natto? It's not for everyone.", "納豆は食べましたか?好みが分かれます。", ["party-food"]],
  ["How do you say “thank you” in your language?", "あなたの言語で「ありがとう」は何と言いますか?", ["party-know"]],
  ["That's an interesting custom.", "面白い習慣ですね。", ["party-know"]],
  ["It's similar in Japan.", "日本でも似ています。", ["party-know"]],
  ["It's a bit different in Japan.", "日本では少し違います。", ["party-know"]],
  ["What time do people usually start work in your office?", "あなたのオフィスでは普通何時に仕事を始めますか?", ["party-know"]],
  ["Do you work from home often?", "在宅勤務は多いですか?", ["party-know"]],
  ["How big is your team?", "チームは何人ですか?", ["party-know"]],
  ["Coffee break?", "コーヒー休憩にしませんか?", ["break"]],
  ["Shall we grab a coffee?", "コーヒーでも飲みに行きませんか?", ["break"]],
  ["Do you know a good place for lunch around here?", "この辺でランチにいい場所を知っていますか?", ["break"]],
  ["Would you like to join us for lunch?", "一緒にランチに行きませんか?", ["break"]],
  ["How are you enjoying Tokyo so far?", "ここまで東京はいかがですか?", ["party-know"]],
  ["Is jet lag hitting you?", "時差ぼけは大丈夫ですか?", ["party-reunion"]],
  ["I'm still a bit jet-lagged.", "まだ少し時差ぼけです。", ["party-reunion"]],
  ["Do you have plans after the training?", "研修の後の予定はありますか?", ["party-know"]],
  ["Are you staying in Tokyo for the weekend?", "週末は東京にいますか?", ["party-know"]],
  ["It was nice chatting with you.", "お話しできてよかったです。", ["party-leave"]],
  ["Let's catch up later.", "また後で話しましょう。", ["break"]],
  ["Sorry, I have to take this call.", "すみません、この電話に出なければなりません。", ["break"]],
  ["Anyway, how's your project going?", "ところで、プロジェクトはどうですか?", ["party-know"]]
],

/* ------------------------------------------------------------------ *
 * 8. 進捗報告・発表  ★★
 * ------------------------------------------------------------------ */
report: [
  ["Let me walk you through our idea.", "私たちのアイデアを説明します。", ["presentation"]],
  ["First, I'll explain the background.", "まず背景を説明します。", ["presentation"]],
  ["Today I'd like to talk about three points.", "今日は3つの点についてお話しします。", ["presentation"]],
  ["Our group discussed the customer problem.", "私たちのグループは顧客の課題について議論しました。", ["presentation"]],
  ["We decided to focus on new users.", "新規ユーザーに焦点を当てることにしました。", ["presentation"]],
  ["The reason is simple.", "理由はシンプルです。", ["presentation"]],
  ["Let me give you an example.", "例を挙げます。", ["presentation"]],
  ["As you can see on this slide, the number is growing.", "このスライドでご覧の通り、数字は伸びています。", ["presentation"]],
  ["This chart shows our results.", "このグラフが結果を示しています。", ["presentation"]],
  ["Moving on to the next point.", "次の点に移ります。", ["presentation"]],
  ["That brings me to my second point.", "これで2つ目の点に入ります。", ["presentation"]],
  ["To sum up, we recommend option B.", "まとめると、私たちはB案を推奨します。", ["presentation"]],
  ["In conclusion, we need more data.", "結論として、もっとデータが必要です。", ["presentation"]],
  ["That's all from our group. Thank you.", "以上が私たちのグループからの発表です。ありがとうございました。", ["presentation"]],
  ["Are there any questions?", "何か質問はありますか?", ["presentation"]],
  ["Does that answer your question?", "ご質問の答えになっていますか?", ["presentation"]],
  ["That's a great question.", "いい質問ですね。", ["presentation"]],
  ["I'm not sure about that. Let me check and get back to you.", "それはわかりません。確認して後でお答えします。", ["presentation"]],
  ["Could you repeat the question, please?", "質問をもう一度お願いできますか?", ["presentation"]],
  ["Sorry, I'll answer in simple English.", "すみません、簡単な英語で答えます。", ["presentation"]],
  ["My colleague can explain that part better.", "その部分は同僚の方がうまく説明できます。", ["presentation"]],
  ["Would you like me to go into more detail?", "もっと詳しく説明しましょうか?", ["presentation"]],
  ["Let me clarify one thing.", "一つ明確にさせてください。", ["presentation"]],
  ["We ran out of time, so we focused on the main issue.", "時間が足りなかったので、主な課題に絞りました。", ["presentation"]],
  ["We faced one difficulty.", "一つ困難がありました。", ["presentation"]],
  ["We solved it by asking the users directly.", "ユーザーに直接聞くことで解決しました。", ["presentation"]],
  ["Here's what we learned.", "私たちが学んだことはこちらです。", ["presentation"]],
  ["Our next step is to test the idea.", "次のステップはアイデアを検証することです。", ["presentation"]],
  ["We'd like your feedback.", "フィードバックをいただきたいです。", ["presentation"]],
  ["Thank you for listening.", "ご清聴ありがとうございました。", ["presentation"]],
  ["I'd like to hand it over to Priya.", "プリヤさんに交代します。", ["presentation"]],
  ["Now Wei will explain the details.", "次にウェイさんが詳細を説明します。", ["presentation"]],
  ["Can everyone see the screen?", "画面は見えていますか?", ["presentation"]],
  ["Sorry, let me go back one slide.", "すみません、1枚前のスライドに戻ります。", ["presentation"]],
  ["I'm a little nervous, so please bear with me.", "少し緊張していますので、ご容赦ください。", ["presentation"]],
  ["Please stop me if anything is unclear.", "わからないところがあれば止めてください。", ["presentation"]],
  ["We worked on this as a team.", "これはチームで取り組みました。", ["presentation"]],
  ["Everyone contributed a lot.", "全員がたくさん貢献してくれました。", ["presentation"]],
  ["To give you some context, our office started this last year.", "背景をお伝えすると、私たちのオフィスは昨年これを始めました。", ["presentation"]],
  ["Let me repeat the key message.", "重要なメッセージを繰り返します。", ["presentation"]]
],

/* ------------------------------------------------------------------ *
 * 9. 会議進行・時間・トラブル対応  ★
 * ------------------------------------------------------------------ */
facilitate: [
  ["Shall we get started?", "始めましょうか?", ["morning"]],
  ["Let's begin.", "始めましょう。", ["morning"]],
  ["Can everyone hear me?", "皆さん聞こえていますか?", ["trouble"]],
  ["Sorry to interrupt, but we're running out of time.", "お話中すみませんが、時間がなくなってきました。", ["discussion"]],
  ["We're running out of time.", "時間がなくなってきました。", ["discussion"]],
  ["We have five minutes left.", "残り5分です。", ["discussion"]],
  ["Let's wrap up.", "まとめに入りましょう。", ["discussion"]],
  ["Shall we take a short break?", "少し休憩しましょうか?", ["break"]],
  ["Let's take a ten-minute break.", "10分休憩を取りましょう。", ["break"]],
  ["We'll start again at three.", "3時に再開します。", ["break"]],
  ["Let's move on to the next topic.", "次のトピックに移りましょう。", ["discussion"]],
  ["Could we come back to that later?", "それは後で戻ってもいいですか?", ["discussion"]],
  ["Let's park that for now.", "それはいったん保留にしましょう。", ["discussion"]],
  ["One at a time, please.", "一人ずつお願いします。", ["discussion"]],
  ["Sorry, I think you were speaking first.", "すみません、先に話していましたよね。", ["discussion"]],
  ["Sorry, I didn't mean to cut you off.", "すみません、遮るつもりはありませんでした。", ["discussion"]],
  ["Let's give everyone a chance to speak.", "全員に発言の機会を作りましょう。", ["discussion"]],
  ["Could we hear from the other groups?", "他のグループの意見も聞けますか?", ["discussion"]],
  ["Sorry, I'm having trouble with the connection.", "すみません、接続の調子が悪いです。", ["trouble"]],
  ["Can you hear me now?", "今聞こえますか?", ["trouble"]],
  ["The screen isn't showing. Could you check?", "画面が映っていません。確認していただけますか?", ["trouble"]],
  ["My laptop froze. Give me a second.", "パソコンが固まりました。少しお待ちください。", ["trouble"]],
  ["Sorry, I'll be right back.", "すみません、すぐ戻ります。", ["trouble"]],
  ["Sorry I'm late.", "遅れてすみません。", ["morning"]],
  ["Sorry, I got lost on the way.", "すみません、道に迷いました。", ["morning"]],
  ["Where are we now in the agenda?", "今アジェンダのどこですか?", ["discussion"]],
  ["Did I miss anything important?", "何か重要なことを聞き逃しましたか?", ["discussion"]],
  ["Could you catch me up?", "状況を教えてもらえますか?", ["discussion"]],
  ["I have to leave a bit early today.", "今日は少し早く失礼します。", ["discussion"]],
  ["Sorry, I need to step out for a moment.", "すみません、少し席を外します。", ["discussion"]],
  ["Let's confirm the action items.", "アクションアイテムを確認しましょう。", ["discussion"]],
  ["Who will do what by when?", "誰が何をいつまでにやりますか?", ["discussion"]],
  ["I'll send the summary afterwards.", "後でまとめを送ります。", ["discussion"]],
  ["Thank you all for today.", "今日はみなさんありがとうございました。", ["discussion"]],
  ["See you tomorrow morning.", "また明日の朝に。", ["party-leave"]]
]

};

/* 多国籍の場で困らないための注意メモ(チートシートに併載) */
var CULTURE_NOTES = [
  {
    title: "飲まない人・食べられないものがある前提で",
    body: "インドネシア(ムスリムが多い)、インド、マレー系の同僚など、宗教や習慣でお酒や特定の食べ物(豚肉・牛肉など)を口にしない人がいる。飲み物や料理を勧めすぎない。まず “Is there anything you don't eat?” と先に聞くのが安全。自分が飲まない場合も “I'm good with soda, thanks.” で軽く流せる。"
  },
  {
    title: "安全な話題",
    body: "食べ物、旅行、スポーツ、映画・ドラマ、出身地の見どころ、研修の感想、仕事の進め方の違い。相手の国について素直に質問するのは好意的に受け取られやすい。"
  },
  {
    title: "避ける話題",
    body: "政治(とくに中国・香港・台湾の関係、インドとその周辺国)、宗教、給料、年齢・結婚・子どもの有無の詮索。国同士を比べて優劣をつける話も避ける。"
  },
  {
    title: "名前は、その場で聞くのが一番失礼がない",
    body: "9カ国50人。聞き慣れない名前が飛び交う。曖昧なまま呼ばず “How do you pronounce your name?” “Did I say your name correctly?” と確認する方が、相手にとってもうれしい。呼びやすい通称を持っている人も多いので “What should I call you?” も有効。"
  },
  {
    title: "自分の名前は先に「呼び方」を渡す",
    body: "“My name is Kenji, but please call me Ken.” のように短い呼び方を自分から提示すると、相手が気楽になり、覚えてもらいやすい。"
  },
  {
    title: "3日間の流れを意識する",
    body: "初日は「輪に入る・名前を覚える」、2日目は「再会して深掘りする」、最終日は「別れとつながりの維持」。2日目の朝に “Good to see you again!” と名前を呼べると一気に距離が縮まる。"
  },
  {
    title: "聞き取れないのは自分だけではない",
    body: "参加者の多くが英語は第二言語。聞き返しは失礼ではなく、むしろ普通のこと。黙って分かったふりをする方がチームには困る。"
  }
];

/* TTSでは再現できない訛りへの備え(チートシートに併載) */
var LISTENING_TIPS = [
  "このツールの音声(en-AU / en-IN / en-GB / en-US)で再現できるのは一部だけ。中国・韓国・インドネシア・台湾の同僚の英語は音が異なる。",
  "各国スピーカーのTEDトークを1日1本、字幕なしで流し見すると耳が慣れる(検索例: “TED talk Indonesia speaker”)。",
  "研修の1〜2週間前から、再生速度を1.2xにして「全部は聞き取れない状態」に慣れておく。本番の懇親会は騒がしく、実際そうなる。",
  "聞き取れない時に固まらないための最終手段は、カテゴリ1の聞き返しフレーズ。これだけは反射で出るまでやる。"
];

/* RAW を Sentence オブジェクトに展開 */
var DEFAULT_SENTENCES = (function () {
  var out = [];
  CATEGORY_ORDER.forEach(function (cat) {
    (RAW[cat] || []).forEach(function (row, i) {
      out.push({
        id: "d-" + cat + "-" + String(i + 1).padStart(3, "0"),
        en: row[0],
        ja: row[1],
        category: cat,
        scenes: row[2] || [],
        priority: CATEGORIES[cat].priority,
        isCustom: false
      });
    });
  });
  return out;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CATEGORIES: CATEGORIES, CATEGORY_ORDER: CATEGORY_ORDER, SCENES: SCENES, RAW: RAW, DEFAULT_SENTENCES: DEFAULT_SENTENCES, CULTURE_NOTES: CULTURE_NOTES, LISTENING_TIPS: LISTENING_TIPS, TRAINING_DAY_FOCUS: TRAINING_DAY_FOCUS };
}
