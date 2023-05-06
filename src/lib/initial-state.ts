export const getInitialState = () => ({
  stations: [
    "東京",
    "品川",
    "新横浜",
    "小田原",
    "熱海",
    "三島",
    "新富士",
    "静岡",
    "掛川",
    "浜松",
    "豊橋",
    "三河安城",
    "名古屋",
  ],
  trainDatasets: [
    {
      train: "こだま",
      data: [
        {
          x: new Date("2022-08-25T22:57:00.000Z"),
          y: "東京",
          key: "↓東京:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:00:00.000Z"),
          y: "品川",
          key: "↓品川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:04:00.000Z"),
          y: "品川",
          key: "↓品川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:10:00.000Z"),
          y: "新横浜",
          key: "↓新横浜:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:15:00.000Z"),
          y: "新横浜",
          key: "↓新横浜:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:30:00.000Z"),
          y: "小田原",
          key: "↓小田原:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:35:00.000Z"),
          y: "小田原",
          key: "↓小田原:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:38:00.000Z"),
          y: "熱海",
          key: "↓熱海:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:43:00.000Z"),
          y: "熱海",
          key: "↓熱海:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:50:00.000Z"),
          y: "三島",
          key: "↓三島:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:55:00.000Z"),
          y: "三島",
          key: "↓三島:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:03:00.000Z"),
          y: "新富士",
          key: "↓新富士:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:08:00.000Z"),
          y: "新富士",
          key: "↓新富士:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:16:00.000Z"),
          y: "静岡",
          key: "↓静岡:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:21:00.000Z"),
          y: "静岡",
          key: "↓静岡:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:33:00.000Z"),
          y: "掛川",
          key: "↓掛川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:38:00.000Z"),
          y: "掛川",
          key: "↓掛川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:46:00.000Z"),
          y: "浜松",
          key: "↓浜松:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:51:00.000Z"),
          y: "浜松",
          key: "↓浜松:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T01:03:00.000Z"),
          y: "豊橋",
          key: "↓豊橋:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T01:08:00.000Z"),
          y: "豊橋",
          key: "↓豊橋:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T01:20:00.000Z"),
          y: "三河安城",
          key: "↓三河安城:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T01:25:00.000Z"),
          y: "三河安城",
          key: "↓三河安城:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T01:37:00.000Z"),
          y: "名古屋",
          key: "↓名古屋:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:08:00.000Z"),
          y: "名古屋",
          key: "↑名古屋:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:19:00.000Z"),
          y: "三河安城",
          key: "↑三河安城:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:24:00.000Z"),
          y: "三河安城",
          key: "↑三河安城:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:36:00.000Z"),
          y: "豊橋",
          key: "↑豊橋:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:41:00.000Z"),
          y: "豊橋",
          key: "↑豊橋:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:53:00.000Z"),
          y: "浜松",
          key: "↑浜松:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:58:00.000Z"),
          y: "浜松",
          key: "↑浜松:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:05:00.000Z"),
          y: "掛川",
          key: "↑掛川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:10:00.000Z"),
          y: "掛川",
          key: "↑掛川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:20:00.000Z"),
          y: "静岡",
          key: "↑静岡:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:25:00.000Z"),
          y: "静岡",
          key: "↑静岡:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:36:00.000Z"),
          y: "新富士",
          key: "↑新富士:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:41:00.000Z"),
          y: "新富士",
          key: "↑新富士:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:49:00.000Z"),
          y: "三島",
          key: "↑三島:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:54:00.000Z"),
          y: "三島",
          key: "↑三島:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:57:00.000Z"),
          y: "熱海",
          key: "↑熱海:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:02:00.000Z"),
          y: "熱海",
          key: "↑熱海:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:09:00.000Z"),
          y: "小田原",
          key: "↑小田原:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:14:00.000Z"),
          y: "小田原",
          key: "↑小田原:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:29:00.000Z"),
          y: "新横浜",
          key: "↑新横浜:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:34:00.000Z"),
          y: "新横浜",
          key: "↑新横浜:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:40:00.000Z"),
          y: "品川",
          key: "↑品川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:45:00.000Z"),
          y: "品川",
          key: "↑品川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:48:00.000Z"),
          y: "東京",
          key: "↑東京:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:53:00.000Z"),
          y: "東京",
          key: "↑東京:発",
          isPass: false,
        },
      ],
      color: { r: 63, g: 81, b: 181, a: 1 },
      repeat: 3,
      isMoveForward: false,
    },
    {
      train: "ひかり",
      data: [
        {
          x: new Date("2022-08-25T23:03:00.000Z"),
          y: "東京",
          key: "↓東京:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:08:00.000Z"),
          y: "品川",
          key: "↓品川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:10:00.000Z"),
          y: "品川",
          key: "↓品川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:18:00.000Z"),
          y: "新横浜",
          key: "↓新横浜:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-25T23:21:00.000Z"),
          y: "新横浜",
          key: "↓新横浜:発",
          isPass: false,
        },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↓小田原:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↓小田原:発",
          isPass: true,
        },
        { x: new Date(`invalid`), y: "熱海", key: "↓熱海:着", isPass: true },
        { x: new Date(`invalid`), y: "熱海", key: "↓熱海:発", isPass: true },
        { x: new Date(`invalid`), y: "三島", key: "↓三島:着", isPass: true },
        { x: new Date(`invalid`), y: "三島", key: "↓三島:発", isPass: true },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↓新富士:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↓新富士:発",
          isPass: true,
        },
        {
          x: new Date("2022-08-26T00:03:00.000Z"),
          y: "静岡",
          key: "↓静岡:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:07:00.000Z"),
          y: "静岡",
          key: "↓静岡:発",
          isPass: false,
        },
        { x: new Date(`invalid`), y: "掛川", key: "↓掛川:着", isPass: true },
        { x: new Date(`invalid`), y: "掛川", key: "↓掛川:発", isPass: true },
        {
          x: new Date("2022-08-26T00:26:00.000Z"),
          y: "浜松",
          key: "↓浜松:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:31:00.000Z"),
          y: "浜松",
          key: "↓浜松:発",
          isPass: false,
        },
        { x: new Date(`invalid`), y: "豊橋", key: "↓豊橋:着", isPass: true },
        { x: new Date(`invalid`), y: "豊橋", key: "↓豊橋:発", isPass: true },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↓三河安城:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↓三河安城:発",
          isPass: true,
        },
        {
          x: new Date("2022-08-26T01:01:00.000Z"),
          y: "名古屋",
          key: "↓名古屋:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T01:43:00.000Z"),
          y: "名古屋",
          key: "↑名古屋:発",
          isPass: false,
        },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↑三河安城:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↑三河安城:発",
          isPass: true,
        },
        { x: new Date(`invalid`), y: "豊橋", key: "↑豊橋:着", isPass: true },
        { x: new Date(`invalid`), y: "豊橋", key: "↑豊橋:発", isPass: true },
        {
          x: new Date("2022-08-26T02:12:00.000Z"),
          y: "浜松",
          key: "↑浜松:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:17:00.000Z"),
          y: "浜松",
          key: "↑浜松:発",
          isPass: false,
        },
        { x: new Date(`invalid`), y: "掛川", key: "↑掛川:着", isPass: true },
        { x: new Date(`invalid`), y: "掛川", key: "↑掛川:発", isPass: true },
        {
          x: new Date("2022-08-26T02:36:00.000Z"),
          y: "静岡",
          key: "↑静岡:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:41:00.000Z"),
          y: "静岡",
          key: "↑静岡:発",
          isPass: false,
        },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↑新富士:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↑新富士:発",
          isPass: true,
        },
        {
          x: new Date("2022-08-26T02:53:00.000Z"),
          y: "三島",
          key: "↑三島:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:58:00.000Z"),
          y: "三島",
          key: "↑三島:発",
          isPass: false,
        },
        { x: new Date(`invalid`), y: "熱海", key: "↑熱海:着", isPass: true },
        { x: new Date(`invalid`), y: "熱海", key: "↑熱海:発", isPass: true },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↑小田原:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↑小田原:発",
          isPass: true,
        },
        {
          x: new Date("2022-08-26T03:24:00.000Z"),
          y: "新横浜",
          key: "↑新横浜:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:29:00.000Z"),
          y: "新横浜",
          key: "↑新横浜:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:35:00.000Z"),
          y: "品川",
          key: "↑品川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:40:00.000Z"),
          y: "品川",
          key: "↑品川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:42:00.000Z"),
          y: "東京",
          key: "↑東京:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:47:00.000Z"),
          y: "東京",
          key: "↑東京:発",
          isPass: false,
        },
      ],
      color: { r: 233, g: 30, b: 99, a: 1 },
      repeat: 4,
      isMoveForward: false,
    },
    {
      train: "のぞみ",
      data: [
        {
          x: new Date("2022-08-26T00:39:00.000Z"),
          y: "東京",
          key: "↓東京:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:41:00.000Z"),
          y: "品川",
          key: "↓品川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:46:00.000Z"),
          y: "品川",
          key: "↓品川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:53:00.000Z"),
          y: "新横浜",
          key: "↓新横浜:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T00:58:00.000Z"),
          y: "新横浜",
          key: "↓新横浜:発",
          isPass: false,
        },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↓小田原:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↓小田原:発",
          isPass: true,
        },
        { x: new Date(`invalid`), y: "熱海", key: "↓熱海:着", isPass: true },
        { x: new Date(`invalid`), y: "熱海", key: "↓熱海:発", isPass: true },
        { x: new Date(`invalid`), y: "三島", key: "↓三島:着", isPass: true },
        { x: new Date(`invalid`), y: "三島", key: "↓三島:発", isPass: true },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↓新富士:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↓新富士:発",
          isPass: true,
        },
        { x: new Date(`invalid`), y: "静岡", key: "↓静岡:着", isPass: true },
        { x: new Date(`invalid`), y: "静岡", key: "↓静岡:発", isPass: true },
        { x: new Date(`invalid`), y: "掛川", key: "↓掛川:着", isPass: true },
        { x: new Date(`invalid`), y: "掛川", key: "↓掛川:発", isPass: true },
        { x: new Date(`invalid`), y: "浜松", key: "↓浜松:着", isPass: true },
        { x: new Date(`invalid`), y: "浜松", key: "↓浜松:発", isPass: true },
        { x: new Date(`invalid`), y: "豊橋", key: "↓豊橋:着", isPass: true },
        { x: new Date(`invalid`), y: "豊橋", key: "↓豊橋:発", isPass: true },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↓三河安城:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↓三河安城:発",
          isPass: true,
        },
        {
          x: new Date("2022-08-26T02:16:00.000Z"),
          y: "名古屋",
          key: "↓名古屋:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T02:20:00.000Z"),
          y: "名古屋",
          key: "↑名古屋:発",
          isPass: false,
        },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↑三河安城:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "三河安城",
          key: "↑三河安城:発",
          isPass: true,
        },
        { x: new Date(`invalid`), y: "豊橋", key: "↑豊橋:着", isPass: true },
        { x: new Date(`invalid`), y: "豊橋", key: "↑豊橋:発", isPass: true },
        { x: new Date(`invalid`), y: "浜松", key: "↑浜松:着", isPass: true },
        { x: new Date(`invalid`), y: "浜松", key: "↑浜松:発", isPass: true },
        { x: new Date(`invalid`), y: "掛川", key: "↑掛川:着", isPass: true },
        { x: new Date(`invalid`), y: "掛川", key: "↑掛川:発", isPass: true },
        { x: new Date(`invalid`), y: "静岡", key: "↑静岡:着", isPass: true },
        { x: new Date(`invalid`), y: "静岡", key: "↑静岡:発", isPass: true },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↑新富士:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "新富士",
          key: "↑新富士:発",
          isPass: true,
        },
        { x: new Date(`invalid`), y: "三島", key: "↑三島:着", isPass: true },
        { x: new Date(`invalid`), y: "三島", key: "↑三島:発", isPass: true },
        { x: new Date(`invalid`), y: "熱海", key: "↑熱海:着", isPass: true },
        { x: new Date(`invalid`), y: "熱海", key: "↑熱海:発", isPass: true },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↑小田原:着",
          isPass: true,
        },
        {
          x: new Date(`invalid`),
          y: "小田原",
          key: "↑小田原:発",
          isPass: true,
        },
        {
          x: new Date("2022-08-26T03:53:00.000Z"),
          y: "新横浜",
          key: "↑新横浜:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T03:58:00.000Z"),
          y: "新横浜",
          key: "↑新横浜:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:05:00.000Z"),
          y: "品川",
          key: "↑品川:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:10:00.000Z"),
          y: "品川",
          key: "↑品川:発",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:12:00.000Z"),
          y: "東京",
          key: "↑東京:着",
          isPass: false,
        },
        {
          x: new Date("2022-08-26T04:15:00.000Z"),
          y: "東京",
          key: "↑東京:発",
          isPass: false,
        },
      ],
      color: { r: 255, g: 193, b: 7, a: 1 },
      repeat: 5,
      isMoveForward: false,
    },
  ],
});
