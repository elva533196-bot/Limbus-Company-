/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Users, 
  UserCircle, 
  Music, 
  Sword, 
  Sparkles,
  ChevronRight,
  Info,
  ExternalLink,
  Shield,
  Zap,
  Activity
} from 'lucide-react';

type PageId = 'world' | 'sinners' | 'identities' | 'music' | 'mechanics' | 'gacha' | 'lore' | 'sinner_detail';

interface ItemInfo {
  name: string;
  rank?: string;
  rarity?: '0' | '00' | '000';
  event?: string;
}

interface Sinner {
  id: string;
  name: string;
  en: string;
  image: string;
  shard: string;
  description: string;
  lore: string[];
  quote: string;
  weapon: string;
  identities: ItemInfo[];
  egos: ItemInfo[];
}

const ANNOUNCERS = [
  { name: '卡戎 (Charon)', rarity: 'Announcer' },
  { name: '瑪庫特 (Malkuth)', rarity: 'Announcer' },
  { name: '尤里 (Yuri)', rarity: 'Announcer' },
  { name: '安潔拉 (Angela)', rarity: 'Announcer' },
  { name: '艾菲 & 謝比 (Effie & Saude)', rarity: 'Announcer' },
  { name: '維吉爾 (Vergilius)', rarity: 'Announcer' },
  { name: '但丁 (Dante)', rarity: 'Announcer' },
  { name: '辛克萊 (Sinclair - Announcer)', rarity: 'Announcer' },
  { name: '莫瑟 & 艾斯拉 (Moses & Ezra)', rarity: 'Announcer' },
  { name: '皮普 (Pip)', rarity: 'Announcer' },
  { name: '中指 (Middle Little Brother)', rarity: 'Announcer' },
  { name: '浮士德 (Faust - Announcer)', rarity: 'Announcer' },
  { name: '李箱 (Yi Sang - Announcer)', rarity: 'Announcer' },
  { name: '以實瑪麗 (Ishmael - Announcer)', rarity: 'Announcer' },
  { name: '希斯克利夫 (Heathcliff - Announcer)', rarity: 'Announcer' },
  { name: '皮埃爾 & 傑克 (Pierre & Jack)', rarity: 'Announcer' },
  { name: '尼莉 (Nelly)', rarity: 'Announcer' },
  { name: '凱瑟琳 (Cathy)', rarity: 'Announcer' }
];

const SINNERS: Sinner[] = [
  { 
    id: '01', name: '李箱', en: 'Yi Sang',
    image: 'https://limbuscompany.wiki.gg/images/thumb/5/50/Yi_Sang_Standard.png/400px-Yi_Sang_Standard.png',
    shard: 'https://limbuscompany.wiki.gg/images/thumb/9/9f/Yi_Sang_Mugshot.png/100px-Yi_Sang_Mugshot.png',
    description: '前 S 公司最年輕的首席研究員，總是沉浸在深奥且憂鬱的思索中。',
    quote: '「哪怕是在深沉的思索中，我也在尋求理想。」',
    weapon: '短劍',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '七協會 6科', rarity: '00' },
      { name: '臼齒事務所 修正者', rarity: '00' },
      { name: 'W公司 2科 清理人員', rarity: '000' },
      { name: '腦葉公司 E.G.O :: 燈籠', rarity: '00' },
      { name: '皮考德號 大副', rarity: '000' },
      { name: '迪艾希協會 4科', rarity: '000' },
      { name: '劍契 殺手', rarity: '000' },
      { name: '如花似月的 E.G.O :: 盈滿之糧', rarity: '000' },
      { name: '多重裂紋事務所 修正者', rarity: '000' },
      { name: '艾德加家族 繼承人', rarity: '000' }
    ],
    egos: [
      { name: '鴉之眼 (Crow\'s Eye View)', rank: 'ZAYIN' },
      { name: '希望之路 (Wishing Cairn)', rank: 'TETH' },
      { name: '此地不再有悲傷 (Bygone Days)', rank: 'HE' },
      { name: '渴望 (Yearning)', rank: 'TETH' },
      { name: '狐雨 (Sunshower)', rank: 'WAW' },
      { name: '浮游 (Float)', rank: 'HE' }
    ],
    lore: [
      '研發出了「鏡像技術」雛形。李箱的人生充滿了與文學、理想相關的悲傷色彩。',
      '曾是知識分子組織「九人會」的成員，對過去的同僚有著複雜的情感。',
      '他的言辭往往充滿哲理且難以捉摸，反映了他深邃的內心世界。'
    ]
  },
  { 
    id: '02', name: '浮士德', en: 'Faust',
    image: 'https://limbuscompany.wiki.gg/images/thumb/3/30/Faust_Standard.png/400px-Faust_Standard.png',
    shard: 'input_file_0.png',
    description: '都市中最聰明的天才科學家，開發了邊獄公司核心技術的「無所不知」者。',
    quote: '「浮士德無所不知。一切皆在計算之中。」',
    weapon: '長柄鐮刀',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '七協會 4科', rarity: '00' },
      { name: '南部 六協會 4科', rarity: '00' },
      { name: '腦葉公司 E.G.O :: 餘燼', rarity: '00' },
      { name: '執事', rarity: '00' },
      { name: '尤羅迪維 隊員', rarity: '00' },
      { name: 'W公司 2科 清理人員', rarity: '000' },
      { name: 'N公司 握籌者', rarity: '000' },
      { name: '迪艾希協會 4科', rarity: '000' },
      { name: '辛克協會 4科', rarity: '000' },
      { name: '拉·曼恰的長槍兵 (Walpurgis)', rarity: '000' }
    ],
    egos: [
      { name: '表徵發射器 (Representation Emitter)', rank: 'ZAYIN' },
      { name: '咒釘 (Hex Hammer)', rank: 'TETH' },
      { name: '液體囊 (Fluid Sac)', rank: 'HE' },
      { name: '電線桿 (Telepole)', rank: 'HE' },
      { name: '懊悔 (Regret)', rank: 'HE' },
      { name: '9:2', rank: 'WAW' },
      { name: '束縛之王 (Everlasting)', rank: 'WAW' }
    ],
    lore: [
      '建造了梅菲斯特號及其搭載的引擎。她的智慧超越了大部分都市居民。',
      '經常以第三人稱自稱，這種特質讓她在人際溝通中顯得極為客觀且疏離。',
      '她似乎能從某種特殊的「網路」中提取知識，這也是她宣稱「無所不知」的底氣。'
    ]
  },
  { 
    id: '03', name: '唐吉訶德', en: 'Don Quixote',
    image: 'https://limbuscompany.wiki.gg/images/thumb/8/8d/Don_Quixote_Standard.png/400px-Don_Quixote_Standard.png',
    shard: 'input_file_0.png',
    description: '對收尾人與正義充滿極度熱情的「騎士」，時常展現出脫離現實的純真。',
    quote: '「為了正義！為了榮耀！吾之長槍將劃破黑暗！」',
    weapon: '長槍',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '史協會 5科', rarity: '00' },
      { name: '劍契 殺手', rarity: '00' },
      { name: '腦葉公司 E.G.O :: 燈火', rarity: '00' },
      { name: 'N公司 中槌', rarity: '00' },
      { name: '皮考德號 船員', rarity: '00' },
      { name: '南部 艾德加家族 女僕', rarity: '00' },
      { name: 'W公司 3科 清理人員', rarity: '000' },
      { name: '中指 小妹', rarity: '000' },
      { name: '辛克協會 4科', rarity: '000' },
      { name: 'T公司 3科 收取稅人員', rarity: '000' },
      { name: '拉·曼恰的理髮師 (Walpurgis)', rarity: '000' }
    ],
    egos: [
      { name: '拉·曼卡之星 (La Sangre de Sancho)', rank: 'ZAYIN' },
      { name: '希望之路 (Wishing Cairn)', rank: 'TETH' },
      { name: '中繼點 (Lifetime Stew)', rank: 'TETH' },
      { name: '電線桿 (Telepole)', rank: 'HE' },
      { name: '液體囊 (Fluid Sac)', rank: 'WAW' },
      { name: '藐視與敬畏 (Contempt, Awe)', rank: 'WAW' }
    ],
    lore: [
      '雖然行為瘋癲，但其背後的騎士精神在殘酷的都市中顯得極為罕見。',
      '她對知名收尾人有著狂熱的追捧，整天夢想著成為英雄。',
      '總是穿著那一雙名為「羅西南多」的黃色靴子，並將其視為騎士的象徵。'
    ]
  },
  { 
    id: '04', name: '良秀', en: 'Ryōshū',
    image: 'https://limbuscompany.wiki.gg/images/thumb/7/75/Ryoshu_Standard.png/400px-Ryoshu_Standard.png',
    shard: 'input_file_0.png',
    description: '追求極致「暴力之美」的劍擊藝術家。',
    quote: '「...快。美。死。這便是我追求的藝術。」',
    weapon: '大太刀',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '七協會 6科', rarity: '00' },
      { name: '南部 艾德加家族 女僕', rarity: '00' },
      { name: 'LCCB 代理人', rarity: '00' },
      { name: '地獄主廚', rarity: '00' },
      { name: '尤羅迪維 隊員', rarity: '00' },
      { name: '腦葉公司 E.G.O :: 紅炎煞', rarity: '00' },
      { name: 'W公司 2科 清理人員', rarity: '000' },
      { name: '黑雲會 若眾', rarity: '000' },
      { name: '二十八宿 修正者', rarity: '000' },
      { name: '尤羅迪維 隊員 (Walpurgis)', rarity: '000' },
      { name: '對我而言空虛的 E.G.O :: 藐視', rarity: '000' }
    ],
    egos: [
      { name: '森羅萬象 (Forest for the Flames)', rank: 'ZAYIN' },
      { name: '蘇打 (Soda)', rank: 'TETH' },
      { name: '紅炎煞 (4th Match Flame)', rank: 'HE' },
      { name: '盲目 (Blind Obsession)', rank: 'WAW' },
      { name: '對我而言空虛 (Contempt, Awe)', rank: 'WAW' }
    ],
    lore: [
      '將戰場視為畫布。她的簡約縮寫往往只有特定人（通常是但丁）能解讀。',
      '她對「藝術」有著極端嚴苛的标准，並認為暴力是最高形式的藝術。',
      '菸癮極大，哪怕在戰鬥中也往往叼著根菸，表現出一種致命的從容。'
    ]
  },
  { 
    id: '05', name: '默爾索', en: 'Meursault',
    image: 'https://limbuscompany.wiki.gg/images/thumb/a/a2/Meursault_Standard.png/400px-Meursault_Standard.png',
    shard: 'input_file_0.png',
    description: '絕對遵從指令且不屈不撓的「局外人」，擁有驚人的意志力。',
    quote: '「我只接受具體指令。判斷與執行將由我完成。」',
    weapon: '護甲',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: 'W公司 2科 清理人員', rarity: '00' },
      { name: '南部 六協會 6科', rarity: '00' },
      { name: 'N公司 中槌', rarity: '00' },
      { name: '死兔幫 老大', rarity: '00' },
      { name: 'R公司 犀牛團隊', rarity: '000' },
      { name: 'N公司 大槌', rarity: '000' },
      { name: '中指 大哥', rarity: '000' },
      { name: '劍契 殺手', rarity: '000' },
      { name: '迪艾希協會 4科', rarity: '000' },
      { name: 'T公司 2科 收取稅人員', rarity: '000' }
    ],
    egos: [
      { name: '鎖鏈 (Chains of Others)', rank: 'ZAYIN' },
      { name: '他必將執行 (Capote)', rank: 'TETH' },
      { name: '螺絲釘 (Screwloose Wallop)', rank: 'TETH' },
      { name: '電線桿 (Telepole)', rank: 'HE' },
      { name: '懊悔 (Regret)', rank: 'HE' },
      { name: '執著 (Ardor Blossom Star)', rank: 'HE' }
    ],
    lore: [
      '沈默且強大，像是一台無法被動搖的精密機器。',
      '他從不對指令提出異議，但也絕不執行指令範圍之外的任何多餘動作。',
      '他的過去與某種法律背景有關，這也解釋了他對規則近乎病態的服從。'
    ]
  },
  { 
    id: '06', name: '鴻璐', en: 'Hong Lu',
    image: 'https://limbuscompany.wiki.gg/images/thumb/d/d5/Hong_Lu_Standard.png/400px-Hong_Lu_Standard.png',
    shard: 'input_file_0.png',
    description: '出身顯赫豪門的「大少爺」，對外界的殘酷有著一種奇妙的天真感。',
    quote: '「哎呀，這裡的生活真是多采多姿。這就是平民的日常嗎？」',
    weapon: '偃月刀',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '黑雲會 若眾', rarity: '00' },
      { name: '南部 六協會 5科', rarity: '00' },
      { name: '鉤子事務所 修正者', rarity: '00' },
      { name: '腦葉公司 E.G.O :: 蘇打', rarity: '00' },
      { name: 'W公司 2科 清理人員', rarity: '000' },
      { name: '迪艾希協會 4科', rarity: '000' },
      { name: 'K公司 3級 強化員工', rarity: '000' },
      { name: '南部 艾德加家族 繼承人', rarity: '000' },
      { name: '南部 六協會 4科', rarity: '000' },
      { name: 'T公司 2科 收取稅人員', rarity: '000' }
    ],
    egos: [
      { name: '因果報應 (Land of Illusion)', rank: 'ZAYIN' },
      { name: '蘇打 (Soda)', rank: 'TETH' },
      { name: '紅炎煞 (4th Match Flame)', rank: 'HE' },
      { name: '薔薇之欲 (Roseate Desire)', rank: 'HE' },
      { name: '沉重維護 (Bygone Days)', rank: 'HE' }
    ],
    lore: [
      '儘管外表優雅，但家族內部的血腥鬥爭讓他擁有一種近乎冷漠的洞察力。',
      '他對周遭的苦難往往表現出好奇而非同情，這源於他與現實脫節的成長環境。',
      '他的雙眼似乎有著不同的魔力，能看透某些常人無法察覺的真相。'
    ]
  },
  { 
    id: '07', name: '希斯克利夫', en: 'Heathcliff',
    image: 'https://limbuscompany.wiki.gg/images/thumb/4/41/Heathcliff_Standard.png/400px-Heathcliff_Standard.png',
    shard: 'input_file_0.png',
    description: '憤怒與痛苦盈滿的「野獸」，為了復仇與失去的愛而前行。',
    quote: '「別擋我的路，不然就把你砸成肉泥！凱西...我一定會...」',
    weapon: '重型球棒',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: 'N公司 中槌', rarity: '00' },
      { name: '七協會 4科', rarity: '00' },
      { name: '皮考德號 捕鯨修正者', rarity: '00' },
      { name: '死兔幫 打手', rarity: '00' },
      { name: 'R公司 兔子團隊', rarity: '000' },
      { name: '皮考德號 奎奎格', rarity: '000' },
      { name: '奧菲 修正者', rarity: '000' },
      { name: '腦葉公司 E.G.O :: 狐雨', rarity: '000' },
      { name: '狂獵', rarity: '000' }
    ],
    egos: [
      { name: '軀體防禦 (Bodysack)', rank: 'ZAYIN' },
      { name: '假日 (Holiday)', rank: 'TETH' },
      { name: '電線桿 (Telepole)', rank: 'HE' },
      { name: '丫頭 (Ya Sunyata Tad Rupam)', rank: 'HE' },
      { name: '蘇打 (Soda)', rank: 'HE' },
      { name: '束縛之王 (Binds)', rank: 'WAW' },
      { name: '墓中起舞 (Dance in the Grave)', rank: 'WAW' }
    ],
    lore: [
      '衝動易怒的外表下，是一顆被往事與悔恨撕裂的心。',
      '他在呼嘯山莊度過的過去是他一生的陰影，也是他所有憤怒的來源。',
      '儘管性格惡劣，但他在戰鬥中表現出的純粹破壞力是隊伍不可或缺的。'
    ]
  },
  { 
    id: '08', name: '以實瑪麗', en: 'Ishmael',
    image: 'https://limbuscompany.wiki.gg/images/thumb/c/cd/Ishmael_Standard.png/400px-Ishmael_Standard.png',
    shard: 'input_file_0.png',
    description: '大海慘劇的「唯一生還者」，極度重視生存規則與理性計畫。',
    quote: '「大海從不原諒弱者。為了生存，我們必須遵守理。」',
    weapon: '鏈錘',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '史協會 5科', rarity: '00' },
      { name: '南部 艾德加家族 女僕', rarity: '00' },
      { name: '南部 六協會 4科', rarity: '00' },
      { name: 'LCCB 代理人', rarity: '00' },
      { name: '腦葉公司 E.G.O :: 蘇打', rarity: '00' },
      { name: '南部 迪艾希協會 4科', rarity: '00' },
      { name: 'R公司 馴鹿團隊', rarity: '000' },
      { name: '皮考德號 船長', rarity: '000' },
      { name: '臼齒事務所 船員', rarity: '000' }
    ],
    egos: [
      { name: '冷酷無情 (Snagharpoon)', rank: 'ZAYIN' },
      { name: '玫瑰之欲 (Roseate Desire)', rank: 'HE' },
      { name: '丫頭 (Ya Sunyata Tad Rupam)', rank: 'HE' },
      { name: '紅炎煞 (Ardor Blossom Star)', rank: 'HE' },
      { name: '盲目 (Blind Obsession)', rank: 'WAW' },
      { name: '振翅 (Wingbeat)', rank: 'WAW' }
    ],
    lore: [
      '對生存有著近乎偏執的堅持，這源於她在皮考德號遭遇的噩夢。',
      '她對「白鯨」有著深刻的仇恨，這種仇恨有時會讓她陷入盲目的瘋狂。',
      '她是隊伍中最可靠的常識人，總是試圖用邏輯來應對都市的混亂。'
    ]
  },
  { 
    id: '09', name: '羅佳', en: 'Rodion',
    image: 'https://limbuscompany.wiki.gg/images/thumb/5/5e/Rodion_Standard.png/400px-Rodion_Standard.png',
    shard: 'input_file_0.png',
    description: '熱情且豪爽的「享樂主義者」，在微笑與賭博中隱藏著沉重的過錯。',
    quote: '「人生就是一場博弈。只要還有骰子可擲，我就不會停下。」',
    weapon: '戰斧',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: 'N公司 中槌', rarity: '00' },
      { name: '南部 六協會 4科', rarity: '00' },
      { name: 'LCCB 代理人', rarity: '00' },
      { name: '尤羅迪維 隊員', rarity: '00' },
      { name: '黑雲會 副組長', rarity: '000' },
      { name: 'T公司 3科 收取稅人員', rarity: '000' },
      { name: '南部 迪艾希協會 4科', rarity: '000' },
      { name: '第九十九 德維亞特分部 配送員', rarity: '000' },
      { name: '中指 小妹', rarity: '000' }
    ],
    egos: [
      { name: '拋擲魂靈 (What is Cast)', rank: 'ZAYIN' },
      { name: '冰橋 (Rime Shank)', rank: 'TETH' },
      { name: '迴望之事 (Bygone Days)', rank: 'HE' },
      { name: '第四火種 (4th Match Flame)', rank: 'HE' },
      { name: '渴求 (Sanguine Desire)', rank: 'WAW' },
      { name: '噴泡 (Effervescent Glop)', rank: 'HE' }
    ],
    lore: [
      '笑容背後隱藏著對過去毀掉故友與村莊的極大罪惡感。',
      '她總是追求即時的快樂，藉此逃避那段充滿寒冷與飢餓的痛苦回憶。',
      '對食物與金錢有著顯著的執著，雖然她總是表现得很慷慨。'
    ]
  },
  { 
    id: '10', name: '辛克萊', en: 'Sinclair',
    image: 'https://limbuscompany.wiki.gg/images/thumb/7/7f/Sinclair_Standard.png/400px-Sinclair_Standard.png',
    shard: 'input_file_0.png',
    description: '在光明與黑暗、善與惡的邊緣徘徊的少年。',
    quote: '「我...我能守護大家嗎？如果這就是我必須跨越的試煉...」',
    weapon: '長柄戰斧',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '辛克協會 4科', rarity: '00' },
      { name: '腦葉公司 E.G.O :: 紅符', rarity: '00' },
      { name: '劍契 殺手', rarity: '00' },
      { name: '馬里亞奇部隊 團長', rarity: '00' },
      { name: '尤羅迪維 隊員', rarity: '00' },
      { name: 'N公司 執釘者', rarity: '000' },
      { name: '南部 瓦爾普吉斯之夜 黎明事務所 修正者', rarity: '000' },
      { name: '南部 迪艾希協會 4科', rarity: '000' }
    ],
    egos: [
      { name: '分岔的路 (Branch of Knowledge)', rank: 'ZAYIN' },
      { name: '中繼點 (Lifetime Stew)', rank: 'TETH' },
      { name: '燈火 (Impending Day)', rank: 'HE' },
      { name: '燈籠 (Lantern)', rank: 'HE' },
      { name: '幽暗深邃 (Cavernous Wailing)', rank: 'HE' },
      { name: '九點二 (9:2)', rank: 'WAW' }
    ],
    lore: [
      '其家族因他的猶豫與對「禁果」的好奇而毀滅，這是他永恆的創傷。',
      '他內心潛藏著與軟弱外表不符的強大爆發力，一旦失控會極其嚴重。',
      '他一直在尋求著某種引導，試圖在混亂的都市中找到自己的定位。'
    ]
  },
  { 
    id: '11', name: '奧提斯', en: 'Outis',
    image: 'https://limbuscompany.wiki.gg/images/thumb/0/07/Outis_Standard.png/400px-Outis_Standard.png',
    shard: 'input_file_1.png',
    description: '深沈幹練的「策略家」，表現出對但丁近乎異常的忠誠與絕對服從。',
    quote: '「一切都在經理的掌握中。我等只需執行最優解。」',
    weapon: '戰術拐杖',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: 'G公司 副組長', rarity: '00' },
      { name: 'W公司 3科 清理人員', rarity: '00' },
      { name: '南部 艾德加家族 白沙特', rarity: '00' },
      { name: '腦葉公司 E.G.O :: 蘇打', rarity: '00' },
      { name: '七協會 4科', rarity: '000' },
      { name: '劍契 導師', rarity: '000' },
      { name: '瓦爾普吉斯之夜 魔彈射手', rarity: '000' },
      { name: '九點九 德維亞特分部 配送員', rarity: '000' },
      { name: '南部 點彩派 學生', rarity: '000' }
    ],
    egos: [
      { name: '致彼方的遺言 (To Pathos Mathos)', rank: 'ZAYIN' },
      { name: '假日 (Holiday)', rank: 'TETH' },
      { name: '太陽之主 (Sunshower)', rank: 'HE' },
      { name: '黑化 (Ebony Stem)', rank: 'WAW' },
      { name: '束縛之王 (Binds)', rank: 'WAW' }
    ],
    lore: [
      '其名字意為「無名小卒」。曾是一名參與過煙霧戰爭且立下赫赫戰功的老兵。',
      '她極其擅長隱藏自己的真實意圖，對大部分罪人保持著專業的疏離感。',
      '她的過去與 G 公司有著千絲萬縷的聯繫，但她對此三緘其口。'
    ]
  },
  { 
    id: '12', name: '格里高爾', en: 'Gregor',
    image: 'https://limbuscompany.wiki.gg/images/thumb/e/e0/Gregor_Standard.png/400px-Gregor_Standard.png',
    shard: 'input_file_0.png',
    description: '被改造為蟲肢的「老兵」，外表隨和自嘲，內心卻渴望著平凡。',
    quote: '「唉，這也是工作的一部分吧？這隻手...還真是方便又麻煩。」',
    weapon: '改造蟲肢',
    identities: [
      { name: 'LCB 罪人', rarity: '0' },
      { name: '南部 六協會 6科', rarity: '00' },
      { name: 'W公司 2科 清理人員', rarity: '00' },
      { name: '黑雲會 若眾', rarity: '00' },
      { name: 'LCCB 代理人', rarity: '00' },
      { name: '南部 艾德加家族 總管', rarity: '00' },
      { name: 'R.B. 二廚', rarity: '00' },
      { name: 'G公司 課長', rarity: '000' },
      { name: '雙鉤海盜團 副船長', rarity: '000' },
      { name: '南部 迪艾希協會 4科', rarity: '000' },
      { name: 'T公司 2科 收取稅人員', rarity: '000' },
      { name: '南部 瓦爾普吉斯之夜 莊主', rarity: '000' }
    ],
    egos: [
      { name: '突然變異 (Suddenly, One Day)', rank: 'ZAYIN' },
      { name: '戲命咒 (Ledger de Main)', rank: 'ZAYIN' },
      { name: '燈籠 (Lantern)', rank: 'TETH' },
      { name: '蘇打 (Soda)', rank: 'TETH' },
      { name: '遺留之物 (Bygone Days)', rank: 'HE' },
      { name: 'AEDD', rank: 'HE' },
      { name: '花園 (Garden of Thorns)', rank: 'WAW' },
      { name: '肅穆哀歌 (Solemn Lament)', rank: 'WAW' }
    ],
    lore: [
      '曾是 G 公司宣傳中的「英雄」，其戰後被遺棄的命運讓他對權威充滿不信任。',
      '他的蟲肢是不穩定且會持續變異的改造產物，也是他心頭的夢魘。',
      '儘管厭倦戰鬥，但他對待同伴有一種溫柔的大哥哥性格。'
    ]
  }
];

const WINGS_DATA = [
  { id: 'A', name: 'A公司 (The Head)', tech: '行政統治 / 都市基本法', nest: 'District 1' },
  { id: 'B', name: 'B公司 (The Eye)', tech: '全域監視 / 資料報表', nest: 'District 2' },
  { id: 'C', name: 'C公司 (The Claw)', tech: '武裝處決 / 清理作業', nest: 'District 3' },
  { id: 'D', name: 'D公司', tech: '未知 (可能與契約相關)', nest: 'District 4' },
  { id: 'E', name: 'E公司', tech: '未知 (推測為紀錄/提取)', nest: 'District 5' },
  { id: 'F', name: 'F公司', tech: '寓言 / 公允 (推測)', nest: 'District 6' },
  { id: 'G', name: 'G公司', tech: '重力操控 / 改良重力', nest: 'District 7 (前)' },
  { id: 'H', name: 'H公司', tech: '未知', nest: 'District 8' },
  { id: 'I', name: 'I公司', tech: '未知', nest: 'District 9' },
  { id: 'J', name: 'J公司', tech: '鎖 / 絕對封閉', nest: 'District 10' },
  { id: 'K', name: 'K公司', tech: '高效再生 / 生命精華', nest: 'District 11' },
  { id: 'L', name: 'L公司 (Lobotomy)', tech: '異想體提取 / 能源', nest: 'District 12 (折斷)' },
  { id: 'M', name: 'M公司', tech: '心理干預 (推測)', nest: 'District 13' },
  { id: 'N', name: 'N公司', tech: '釘與槌 / 禁忌共鳴', nest: 'District 14' },
  { id: 'O', name: 'O公司', tech: '未知', nest: 'District 15' },
  { id: 'P', name: 'P公司', tech: '未知', nest: 'District 16' },
  { id: 'Q', name: 'Q公司', tech: '未知', nest: 'District 17' },
  { id: 'R', name: 'R公司', tech: '克隆 / 克隆僱傭兵', nest: 'District 18' },
  { id: 'S', name: 'S公司', tech: '視覺擬態 (推測)', nest: 'District 19' },
  { id: 'T', name: 'T公司', tech: '時間取樣 / 時間停滯', nest: 'District 20' },
  { id: 'U', name: 'U公司', tech: '震動 / 大湖調頻', nest: 'District 21' },
  { id: 'V', name: 'V公司', tech: '未知', nest: 'District 22' },
  { id: 'W', name: 'W公司', tech: '空間跳躍 (Warp)', nest: 'District 23' },
  { id: 'X', name: 'X公司', tech: '未知', nest: 'District 24' },
  { id: 'Y', name: 'Y公司', tech: '未知', nest: 'District 25' },
  { id: 'Z', name: 'Z公司', tech: '末端管理 (推測)', nest: 'District 26' },
];

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('world');
  const [selectedSinner, setSelectedSinner] = useState<Sinner | null>(null);

  const navItems: { id: PageId; label: string; icon: any }[] = [
    { id: 'world', label: '世界背景', icon: Globe },
    { id: 'sinners', label: '罪人介紹', icon: Users },
    { id: 'identities', label: '人格介紹', icon: UserCircle },
    { id: 'music', label: '音樂', icon: Music },
    { id: 'mechanics', label: '遊戲機制', icon: Sword },
    { id: 'gacha', label: '抽卡體驗', icon: Sparkles },
  ];

  const handleSinnerClick = (sinner: Sinner) => {
    setSelectedSinner(sinner);
    setActivePage('sinner_detail');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden bg-[#0c0c0c] text-[#e0e0e0]">
      {/* Header Profile */}
      <header className="relative py-24 sm:py-32 px-4 text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center brightness-50" 
          style={{ backgroundImage: "url('https://images2.alphacoders.com/130/1301047.png')", filter: 'blur(2px) brightness(0.4)' }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#0c0c0c]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-[0.2em] text-white mb-4 drop-shadow-lg cursor-pointer font-serif" onClick={() => {setActivePage('world'); setSelectedSinner(null);}}>
            LIMBUS COMPANY
          </h1>
          <p className="text-[#d4af37] text-lg sm:text-xl tracking-widest uppercase font-medium">
            Face the Sin, Save the E.G.O
          </p>
        </motion.div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-[#8b0000] shadow-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar py-2 gap-2 sm:gap-4 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id || (item.id === 'world' && activePage === 'lore') || (item.id === 'sinners' && activePage === 'sinner_detail');
              return (
                <button
                  key={item.id}
                  onClick={() => {setActivePage(item.id); setSelectedSinner(null);}}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-sm transition-all duration-300 relative group whitespace-nowrap ${
                    isActive ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#d4af37]' : 'group-hover:scale-110 transition-transform'} />
                  <span className="font-bold tracking-wider">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage + (selectedSinner?.id || '')}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'world' && <WorldSection onExplore={() => setActivePage('lore')} />}
            {activePage === 'lore' && <LoreSection onBack={() => setActivePage('world')} />}
            {activePage === 'sinners' && <SinnersSection onSelect={handleSinnerClick} />}
            {activePage === 'sinner_detail' && selectedSinner && (
              <SinnerDetailPage sinner={selectedSinner} onBack={() => setActivePage('sinners')} />
            )}
            {activePage === 'identities' && <IdentitiesSection />}
            {activePage === 'music' && <MusicSection />}
            {activePage === 'mechanics' && <MechanicsSection />}
            {activePage === 'gacha' && <GachaSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-[#333] py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-2">
            &copy; 2024 Project Moon - Limbus Company Fan Site
          </p>
          <div className="flex justify-center items-center gap-2 text-gray-600 text-xs">
            <Info size={12} />
            <span>參考資料：邊獄公司灰機 Wiki / Project Moon 官方網站</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#d4af37] border-l-4 border-[#8b0000] pl-4 tracking-wider">
        {children}
      </h2>
      {subtitle && <p className="text-gray-500 text-sm pl-5 mt-1 font-mono tracking-tighter uppercase">{subtitle}</p>}
    </div>
  );
}

function Card({ children, title, className = "", onClick }: { children: ReactNode; title?: string; className?: string; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-[#1a1a1a] border border-[#333] rounded-sm p-6 mb-6 shadow-2xl relative overflow-hidden group transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-[#d4af37]/50' : ''} ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b0000]/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-[#8b0000]/10 transition-colors" />
      {title && <h3 className="text-xl font-bold text-[#d4af37] mb-4 flex items-center gap-2">
        <ChevronRight size={18} className="text-[#8b0000] group-hover:translate-x-1 transition-transform" />
        {title}
      </h3>}
      <div className="relative z-10 text-[#e0e0e0] leading-relaxed">
        {children}
      </div>
      {onClick && (
        <div className="absolute bottom-2 right-4 text-[10px] text-gray-600 font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase">
          點擊查看詳情 (Click to Expand)
        </div>
      )}
    </div>
  );
}

function WorldSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-0">
        <SectionHeading subtitle="World Concept">世界背景</SectionHeading>
        <button 
          onClick={onExplore}
          className="text-xs font-bold text-[#d4af37] hover:text-white transition-colors flex items-center gap-1 group"
        >
          查看詳細設定 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <Card onClick={onExplore}>
        <p className="mb-6 indent-8">
          故事發生在一個被稱為「都市」的巨大反烏托邦社會。都市被分為 26 個區（A-Z），每個區都由一個「翼」（Corporation）進行統治。玩家將扮演 Limbus Company 的決策者 <b className="text-[#d4af37]">Dante</b>，帶領 12 名罪人穿梭於廢棄的腦葉公司（Lobotomy Corp）支部，回收珍貴的「金枝」。
        </p>
        <p className="indent-8 italic text-gray-400">
          這個世界充滿了奇點、異想體以及混亂的組織，是一個生命廉價且殘酷的地方。
        </p>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="都市 (The City)" onClick={onExplore}>
          <p className="text-sm leading-relaxed">由 26 個地區組成，受制於嚴格的階級制度與律法。這裡是所有故事的起源。</p>
        </Card>
        <Card title="翼 (The Wings)" onClick={onExplore}>
          <p className="text-sm leading-relaxed">統治都市的巨型企業，各自擁有獨特的「奇點」技術，維持著都市的運作與殘酷的秩序。</p>
        </Card>
      </div>
    </section>
  );
}

function LoreSection({ onBack }: { onBack: () => void }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#d4af37]"
        >
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <SectionHeading subtitle="Detailed Compendium of The City">都市詳細百科</SectionHeading>
      </div>

      <div className="space-y-12">
        {/* City History */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            01. 都市歷史概觀 (History)
          </h3>
          <div className="space-y-4">
            <Card title="煙霧戰爭 (The Smoke War)">
              <p className="text-sm leading-relaxed">
                一場改寫都市能源格局的大戰。舊 L 公司倒台後，多方勢力為了爭奪新的能源「奇點」而展開激戰。最終，腦葉公司 (Lobotomy Corp) 崛起，並成為了新的 L 公司，這場戰爭也催生了許多現今的收尾人傳奇與災禍。
              </p>
            </Card>
            <Card title="白夜與黑晝 (White Nights & Dark Days)">
              <p className="text-sm leading-relaxed">
                由於腦葉公司最終方案的啟動與失敗，都市經歷了長達七天的「白夜與黑晝」。巨大的光之柱從 L 公司本部升起，散播著「光之種子」，但也導致了無數支部的崩毀與異想體的逃逸。這場異變產生了「圖書館」，並引發了都市後巷中大規模的噩夢顯現。
              </p>
            </Card>
          </div>
        </div>

        {/* The Structure */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            02. 都市的地理與結構 (Geography)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="巢 (The Nest)">
              <p className="text-sm text-[#e0e0e0] leading-relaxed">
                位於 26 個區中心的高級居住區。這裡由對應的「翼」直接統治，居住權極其昂貴，且受到嚴密的監控。失業或失去居住權通常意味著被驅逐至危險的後巷。
              </p>
            </Card>
            <Card title="後巷 (The Backstreets)">
              <p className="text-sm text-[#e0e0e0] leading-relaxed">
                佔據都市絕大部分面積的混亂區域。這裡不受翼的直接保護，由各類幫派與「五指」分而治之，也是「清道夫」每晚活動清理的場所。
              </p>
            </Card>
            <Card title="大湖 (The Great Lake)">
              <p className="text-sm text-[#e0e0e0] leading-relaxed">
                位於都市 U 區的巨大水域，充滿了未知的海怪與被稱為「校難」的異象。其海域有著獨特的導航規則——「鯨之理」。
              </p>
            </Card>
            <Card title="郊區、遺址與外環 (Outskirts & Ruins)">
              <p className="text-sm text-[#e0e0e0] leading-relaxed">
                都市邊境之外的荒野與古代文明的殘骸。充滿了危險的怪物與不可言說的異像，是大多數異想體的起源地。
              </p>
            </Card>
          </div>
        </div>

        {/* Laws & Taboos */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            03. 都市律法與禁忌 (Taboos)
          </h3>
          <Card>
            <div className="space-y-4 text-sm">
              <p><span className="text-[#8b0000] font-bold">人工智慧禁令 (AI Ethics)：</span> 嚴格禁止製造具有人類情感、外貌或思維模式的 AI。這是首腦最不容挑戰的法律之一。</p>
              <p><span className="text-[#8b0000] font-bold">銃器稅與限制 (Gun Laws)：</span> 為防止平民擁有大規模殺傷力，遠距離武器在都市受到極端高昂的稅收與限制，導致戰鬥多為冷兵器交鋒。</p>
              <p><span className="text-[#8b0000] font-bold">遺體處理規則：</span> 基於後巷生態，屍體必須在特定時間內清理，否則會招致不必要的麻煩或清道夫的異常行為。</p>
            </div>
          </Card>
        </div>

        {/* The Backstreets Deep Dive */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            04. 後巷的生存法則 (The Backstreets)
          </h3>
          <div className="space-y-6">
            <Card title="後巷的深夜 (The Night in the Backstreets)">
              <p className="text-sm leading-relaxed mb-4">
                每天凌晨 <span className="text-lc-red font-bold">03:13 至 04:34</span> 是都市最恐怖的時段。這段時間內，後巷的一切律法失效，所有的監視器都會關閉。這是不成文的規則：除了「清道夫」之外，任何在外面遊蕩的人都將被視為垃圾處理。
              </p>
              <div className="bg-black/40 p-4 border-l-2 border-lc-red">
                <p className="text-xs italic text-gray-400">
                  「只要太陽升起，昨晚發生的一切都會像灰塵一樣被清掃乾淨。」
                </p>
              </div>
            </Card>

            <Card title="勢力核心：五指 (The Five Fingers)">
              <p className="text-sm mb-6">掌握後巷秩序的巨型暴力組織，每個手指都有其極端且絕對的意志：</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-black/40 border border-lc-border">
                  <div className="text-lc-gold font-bold mb-1">拇指 (Thumb)</div>
                  <p className="text-[11px] leading-tight text-gray-400">嚴格的階級制度與禮儀。對上位者的任何不敬都會招致滅門之災。口號是「禮儀重於生命」。</p>
                </div>
                <div className="p-3 bg-black/40 border border-lc-border">
                  <div className="text-lc-gold font-bold mb-1">食指 (Index)</div>
                  <p className="text-[11px] leading-tight text-gray-400">遵循神秘的「指令」(Prescript)。指令由織機產出，內容可能極端荒謬，但必須無條件執行。</p>
                </div>
                <div className="p-3 bg-black/40 border border-lc-border">
                  <div className="text-lc-gold font-bold mb-1">中指 (Middle)</div>
                  <p className="text-[11px] leading-tight text-gray-400">以「家人」為核心。極度團結且記仇，口號是「報復是家人的晚餐」，傷害一人等同宣戰整個組織。</p>
                </div>
                <div className="p-3 bg-black/40 border border-lc-border">
                  <div className="text-lc-gold font-bold mb-1">無名指 (Ring)</div>
                  <p className="text-[11px] leading-tight text-gray-400">追求極致的「藝術」。將人體的苦難與殘缺視為靈魂的刻畫，行為難以預測且充滿美學瘋狂。</p>
                </div>
                <div className="p-3 bg-black/40 border border-lc-border">
                  <div className="text-lc-gold font-bold mb-1">小指 (Pinky)</div>
                  <p className="text-[11px] leading-tight text-gray-400">專注於「契約」與交易。在混亂中建立規則，掌控著後巷的黑市經濟與地下聯絡網。</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* The Three Pillars */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            05. 行政核心：首腦、眼、爪
          </h3>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-2 border-[#8b0000] pl-4">
                <h4 className="text-[#d4af37] font-bold mb-2">首腦 (The Head)</h4>
                <p className="text-xs text-[#e0e0e0] leading-tight">管轄 A 公司。都市絕對的立法者與統治者，視都市為一個封閉的實驗場，確保人類文明按其規則運行。</p>
              </div>
              <div className="border-l-2 border-[#8b0000] pl-4">
                <h4 className="text-[#d4af37] font-bold mb-2">眼 (The Eye)</h4>
                <p className="text-xs text-[#e0e0e0] leading-tight">管轄 B 公司。全視的監控者。負責所有資料收集、審查與稅務。他們確信都市內沒有任何事情能瞞過他們的觀察。</p>
              </div>
              <div className="border-l-2 border-[#8b0000] pl-4">
                <h4 className="text-[#d4af37] font-bold mb-2">爪 (The Claw)</h4>
                <p className="text-xs text-[#e0e0e0] leading-tight">管轄 C 公司。首腦的武器與執行人。人類戰力的頂點，負責物理性肅清任何被判定為「罪犯」的目標。</p>
              </div>
            </div>
          </Card>
        </div>

        {/* The Wings Section Expanded */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            06. 二十六區與翼 (The 26 Wings)
          </h3>
          <Card>
            <p className="mb-4 text-sm leading-relaxed">
              都市被劃分為 26 個行政區，每個行政區皆由一家被稱為「翼」的龐大企業統治。每一家公司都擁有其獨特的「奇點」技術。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WINGS_DATA.map((wing) => (
                <div key={wing.id} className="p-3 bg-black/40 border border-[#333] hover:border-[#d4af37]/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[#d4af37] font-bold text-xs">{wing.name}</div>
                    <div className="text-[10px] bg-[#8b0000]/20 px-1 border border-[#8b0000]/30 text-[#8b0000] font-mono">{wing.id} Corp</div>
                  </div>
                  <div className="text-[9px] text-gray-500">{wing.nest}</div>
                  <div className="text-[10px] text-[#e0e0e0] mt-1 border-t border-[#333]/30 pt-1">
                    <span className="text-[#d4af37]/70 font-bold">奇點：</span>{wing.tech}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Fixers & Associations */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            07. 收尾人與協會 (Fixers & Associations)
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <Card title="收尾人系統 (Fixers)">
              <p className="text-sm leading-relaxed mb-4">
                收尾人是都市中解決各類委託的職業。從日常瑣事到獵殺異想體，只要有錢，收尾人就能代勞。他們被劃分為 9 個等級，其中 <span className="text-lc-gold font-bold">1 階收尾人</span> 是精英，而「色彩」級則是都市最強者的代號。
              </p>
            </Card>
            <Card title="Hana 協會與 12 協會">
              <p className="text-xs mb-4 text-[#e0e0e0]">由 Hana 協會監管，負責管理全球收尾人的分級與委託分派：</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Hana (1)', role: '總管 / 評級' },
                  { name: 'Zwei (2)', role: '公共安全 / 防衛' },
                  { name: 'Shi (4)', role: '隱密 / 暗殺' },
                  { name: 'Liu (6)', role: '大規模戰鬥 / 火攻' },
                  { name: 'Seven (7)', role: '情報解析 / 偵查' },
                  { name: 'Dieci (10)', role: '學識管理 / 聖典' }
                ].map(assoc => (
                  <div key={assoc.name} className="p-2 border border-[#333] bg-black/20">
                    <div className="text-lc-gold font-bold text-xs">{assoc.name}</div>
                    <div className="text-[9px] text-gray-500">{assoc.role}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Hazards */}
        <div>
          <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#8b0000]"></span>
            08. 都市的噩夢 (Threats)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="清道夫 (Sweepers)">
              <p className="text-sm">深夜時出現在後巷。成群結隊清理垃圾與所有活動目標，維持後巷生態平衡的怪物。</p>
            </Card>
            <Card title="異想體 (Abnormalities)">
              <p className="text-sm">誕生於人類意識深處的恐怖存在。幾乎不死不滅，只能被鎮壓或暫時收容。</p>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center pb-12">
        <button 
          onClick={onBack}
          className="px-8 py-4 bg-[#8b0000] text-white font-bold hover:bg-[#8b0000]/80 transition-all rounded-sm shadow-lg shadow-[#8b0000]/30 hover:-translate-y-1 active:translate-y-0"
        >
          返回概訊 (Back to Summary)
        </button>
      </div>
    </section>
  );
}

function SinnersSection({ onSelect }: { onSelect: (sinner: Sinner) => void }) {
  return (
    <section>
      <SectionHeading subtitle="Project Moon - Limbus Company">罪人介紹</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
        {SINNERS.map((sinner) => (
          <motion.div
            key={sinner.id}
            whileHover={{ y: -12, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(sinner)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative w-32 h-[192px] sm:w-36 sm:h-[216px] overflow-visible">
              <img 
                src={sinner.shard} 
                alt={sinner.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_15px_30px_rgba(139,0,0,0.3)] transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/300x450/1a1a1a/8b0000?text=${sinner.en}`;
                }}
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm font-bold text-[#e0e0e0] group-hover:text-[#d4af37] transition-colors">{sinner.name}</div>
              <div className="text-[10px] text-[#d4af37]/60 font-mono tracking-[0.2em] mt-0.5">{sinner.en.toUpperCase()}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SinnerDetailPage({ sinner, onBack }: { sinner: Sinner; onBack: () => void }) {
  return (
    <section className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#d4af37]"
        >
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <SectionHeading subtitle={`Sinner Profile #${sinner.id}`}>{sinner.name}</SectionHeading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Image Column */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="aspect-[3/4] border-2 border-[#8b0000] p-1 bg-black shadow-2xl relative">
            <div className="absolute -top-3 -left-3 bg-[#8b0000] text-white px-3 py-1 font-mono text-xs font-bold z-20">
              L.C.B - {sinner.id}
            </div>
            <img 
              src={sinner.image} 
              alt={sinner.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover contrast-110 shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1a1a1a/d4af37?text=${sinner.en}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="p-3 bg-black/40 border border-[#333] border-l-2 border-l-[#d4af37]">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">主要武器 (Weapon)</label>
              <div className="text-[#d4af37] font-bold">{sinner.weapon}</div>
            </div>
            <div className="p-3 bg-black/40 border border-[#333] border-l-2 border-l-[#8b0000]">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">代號名稱 (Codename)</label>
              <div className="text-white font-bold">{sinner.en}</div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="md:col-span-8 lg:col-span-9 space-y-8">
          {/* Quote Card */}
          <div className="relative p-10 border border-[#333] bg-[#1a1a1a] shadow-inner font-serif">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8b0000] -mt-1 -ml-1" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8b0000] -mb-1 -ml-1" />
            <p className="text-2xl italic text-[#d4af37] leading-relaxed text-center">
              {sinner.quote}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="人物概覽" className="mb-0">
              <p className="text-sm leading-relaxed mb-4 text-[#e0e0e0]">
                {sinner.description}
              </p>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8b0000]/30 to-transparent my-4" />
              <div className="space-y-4">
                {sinner.lore.map((para, i) => (
                  <p key={i} className="text-xs text-gray-400 leading-relaxed indent-4">
                    {para}
                  </p>
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              <Card title="相關資訊 (Info)" className="mb-0">
                <div className="space-y-4 text-xs">
                  <p className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-gray-500 uppercase">編號</span>
                    <span className="text-white font-bold">{sinner.id}</span>
                  </p>
                  <p className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-gray-500 uppercase">英文全名</span>
                    <span className="text-white font-bold">{sinner.en}</span>
                  </p>
                  <p className="flex justify-between border-b border-[#333] pb-2">
                    <span className="text-gray-500 uppercase">所屬單位</span>
                    <span className="text-[#8b0000] font-bold">Limbus Company</span>
                  </p>
                  <p className="mt-4 text-gray-400 italic">
                    「每位罪人的過去都印刻在梅菲斯特號的軌跡上...」
                  </p>
                </div>
              </Card>
              
              <div className="p-8 border border-dashed border-[#8b0000]/30 rounded-sm text-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-mono mb-4">CONFIDENTIAL DATA</p>
                <button 
                  onClick={onBack}
                  className="px-6 py-2 border border-[#d4af37] text-[#d4af37] text-xs font-bold hover:bg-[#d4af37] hover:text-black transition-all"
                >
                  返回罪人列表 (Return to List)
                </button>
              </div>
            </div>
          </div>

          {/* Identities and EGO Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="鏡像人格 (Identities)">
              <div className="space-y-3">
                {[...(sinner.identities || [])]
                  .sort((a, b) => (a.rarity?.length || 0) - (b.rarity?.length || 0))
                  .map((id, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/40 border border-[#333] hover:border-[#d4af37]/30 transition-all group">
                    <span className="text-sm group-hover:text-[#d4af37] transition-colors">{id.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 border font-mono ${
                      id.rarity === '000' ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10' :
                      id.rarity === '00' ? 'border-[#8b0000] text-[#8b0000] bg-[#8b0000]/10' :
                      'border-gray-600 text-gray-500'
                    }`}>
                      {id.rarity ? '0'.repeat(id.rarity.length) : '0'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="E.G.O 列表">
              <div className="space-y-3">
                {[...(sinner.egos || [])]
                  .sort((a, b) => {
                    const order: Record<string, number> = { 'ZAYIN': 0, 'TETH': 1, 'HE': 2, 'WAW': 3, 'ALEPH': 4 };
                    return (order[a.rank || ''] ?? 99) - (order[b.rank || ''] ?? 99);
                  })
                  .map((ego, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/40 border border-[#333] hover:border-[#8b0000]/30 transition-all group">
                    <span className="text-sm group-hover:text-[#8b0000] transition-colors font-medium">{ego.name}</span>
                    <span className="text-[10px] text-gray-500 font-mono italic">{ego.rank}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function IdentitiesSection() {
  return (
    <section className="space-y-12">
      <div>
        <SectionHeading>人格與可能性 (Identities & Possibilities)</SectionHeading>
        <Card title="鏡像世界理論">
          <p className="mb-4 text-[#e0e0e0] leading-relaxed">
            人格是罪人們在其他平行世界中的「可能性」。透過梅菲斯特號搭載的提取裝置，罪人可以借用該世界中自己的技能與記憶。
            每一種人格都有其獨特的戰術價值與配套技能。
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-2 px-3 py-1 bg-gray-800 border border-gray-600 rounded-sm text-[10px] text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span> 基礎人格 (0)
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-blue-900/20 border border-blue-500/30 rounded-sm text-[10px] text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span> 精良人格 (00)
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-yellow-900/20 border border-[#d4af37]/30 rounded-sm text-[10px] text-[#d4af37]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)]"></span> 極稀有人格 (000)
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SINNERS.map((sinner) => (
          <div key={sinner.id} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#8b0000] pb-2">
              <span className="text-[#8b0000] font-mono font-bold text-lg">#{sinner.id}</span>
              <h4 className="text-[#d4af37] font-bold">{sinner.name} <span className="text-[10px] text-gray-500 ml-1">({sinner.en})</span></h4>
            </div>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-[10px] uppercase tracking-widest text-[#8b0000] font-bold mb-3">鏡像人格 (Identities)</h5>
                <div className="space-y-1">
                  {[...(sinner.identities || [])]
                    .sort((a, b) => (a.rarity?.length || 0) - (b.rarity?.length || 0))
                    .map((id, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 bg-black/20 hover:bg-black/40 border border-transparent hover:border-[#333] transition-colors rounded-sm">
                      <span className="text-gray-300">{id.name}</span>
                      <span className={`text-[9px] font-mono ${
                        id.rarity === '000' ? 'text-[#d4af37]' :
                        id.rarity === '00' ? 'text-blue-400' :
                        'text-gray-500'
                      }`}>
                        {id.rarity ? '0'.repeat(id.rarity.length) : '0'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">E.G.O 子系統</h5>
                <div className="grid grid-cols-1 gap-1">
                  {[...(sinner.egos || [])]
                    .sort((a, b) => {
                      const order: Record<string, number> = { 'ZAYIN': 0, 'TETH': 1, 'HE': 2, 'WAW': 3, 'ALEPH': 4 };
                      return (order[a.rank || ''] ?? 99) - (order[b.rank || ''] ?? 99);
                    })
                    .map((ego, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] p-2 bg-[#8b0000]/5 border border-transparent hover:border-[#8b0000]/20 transition-colors">
                      <span className="text-gray-400">{ego.name}</span>
                      <span className="text-[9px] font-mono italic text-[#8b0000]">{ego.rank}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const MILI_SONGS = [
  { 
    title: 'In Hell We Live, Lament', 
    chapter: '載入遊戲音樂 / Opening Theme', 
    youtubeId: 'XfTWgMgknpY',
    description: '進入邊獄公司世界的序曲，交織著極速的情緒與沈重的嘆息。'
  },
  { 
    title: 'Fly, My Wings', 
    chapter: '第三章 (The Unconfronted) - 辛克萊', 
    youtubeId: 'lu8i-OyjLYk',
    description: '與庫洛莫羅斯的決戰之曲，辛克萊那撕裂黑暗、展翅高飛的渴望。'
  },
  { 
    title: 'Passage', 
    chapter: '第四章 (The Unchanging) - 李箱', 
    youtubeId: '_PSjoVXFGAQ',
    description: '在破碎的玻璃窗與理想的彼岸，李箱那靜謐卻又哀傷的追尋。'
  },
  { 
    title: 'Compass', 
    chapter: '第五章 (The Evil Defining) - 以實瑪麗', 
    youtubeId: '92E0X59wzeg',
    description: '在大海的怒濤與白鯨的陰影下，指引生存方向的羅盤之聲。'
  },
  { 
    title: 'Through the Patch of Violet', 
    chapter: '第六章 (The Heartbroken) - 希斯克利夫', 
    youtubeId: 'G_JfKOjwzwo',
    description: '穿越那一抹紫羅蘭色的花叢，是希斯克利夫那跨越死生的執念。'
  },
  { 
    title: 'La Luna', 
    chapter: '第七章 (The Dreamer) - 唐吉訶德', 
    youtubeId: 'ZuifkacZ0TA',
    description: '映照在銀色月光下的騎士之夢，是壯烈而又溫柔的落幕。'
  },
  { 
    title: 'Aether', 
    chapter: '第八章 (The Unrestrained) - 鴻璐', 
    youtubeId: 'szyPY8nbBF4',
    description: '在虛幻與真實的宮殿中，鴻璐那優雅卻又孤寂的探尋。'
  },
  { 
    title: 'The Last Dance', 
    chapter: '第九章 (The Unfulfilled) - 良秀', 
    youtubeId: 'h0djuhl97Kw',
    description: '在無拘無束的藝術殿堂中，良秀那燃燒的鬥志與對極致之美的追求。'
  }
];

function MusicSection() {
  return (
    <section className="space-y-12">
      <div>
        <SectionHeading>音樂藝術 (Mili & Limbus Company)</SectionHeading>
        <Card>
          <p className="text-[#e0e0e0] leading-relaxed">
            Limbus Company 的敘事靈魂之一在於其高度契合劇情的音樂。知名樂團 <span className="text-[#d4af37] font-bold">Mili</span> 為每一章的罪人故事量身打造了專屬的主題曲/片尾曲。
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {MILI_SONGS.map((song, idx) => (
          <div key={idx} className="group bg-black/40 border border-[#333] overflow-hidden hover:border-[#8b0000]/50 transition-all">
            <div className="aspect-video w-full bg-black/60 relative">
              <iframe
                className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?rel=0`}
                title={song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[#d4af37] font-bold text-lg">{song.title}</h4>
                  <p className="text-xs text-[#8b0000] font-mono mt-1">{song.chapter}</p>
                </div>
                <a 
                  href={`https://www.youtube.com/watch?v=${song.youtubeId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 border border-[#333] hover:border-[#d4af37] text-xs text-gray-500 hover:text-[#d4af37] transition-all bg-black/40"
                >
                  <ExternalLink size={14} />
                  <span>在 YouTube 播放</span>
                </a>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed italic border-l-2 border-[#8b0000]/30 pl-3">
                {song.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center p-8 border border-dashed border-[#333] rounded-sm">
        <p className="text-gray-500 text-sm">
          ※ 若影片無法在嵌入視窗中播放，請點擊「在 YouTube 播放」按鈕跳轉至官方頻道。
        </p>
      </div>
    </section>
  );
}

function MechanicsSection() {
  const mechanicsGroups = [
    {
      id: "fundamental",
      label: "戰鬥基礎 (Basics)",
      items: [
        {
          title: "技能與硬幣 (Skills & Coins)",
          icon: <Sword size={18} />,
          details: "每項技能由基礎值與硬幣組成。投擲正反面決定最終威力。最終威力 = 基礎值 + (正面硬幣數 × 硬幣威力)。當理智值越高，投出正面的機率就越大。"
        },
        {
          title: "拼點系統 (The Clash)",
          icon: <Users size={18} />,
          details: "當兩名角色互相攻擊時觸發。威力較高者贏得該次拼點。贏家擊碎輸家的一個硬幣並繼續拼點，直到一方硬幣全碎或拼點結束。拼點勝出的技能會對目造成完整傷害。"
        }
      ]
    },
    {
      id: "attributes",
      label: "屬性與體系 (System)",
      items: [
        {
          title: "物理與罪惡抗性",
          icon: <Zap size={18} />,
          details: "傷害分為物理屬性（斬擊、穿刺、突刺）及七種罪惡屬性（憤怒、色慾等）。抗性等級從致命 (2.0x) 到 無效 (0.0x) 不等，戰鬥中必須針對敵方弱點進行攻擊。"
        },
        {
          title: "理智值 (SP / Sanity)",
          icon: <Activity size={18} />,
          details: "範圍為 -45 至 +45。理智值越高，硬幣正面率越高（+45 時為 95%）。理智值過低時，罪人可能會陷入「恐慌」或「侵蝕」狀態，敵我不分地發起攻擊。"
        }
      ]
    },
    {
      id: "status",
      label: "生理狀態 (Status)",
      items: [
        {
          title: "混亂狀態 (Stagger)",
          icon: <Shield size={18} />,
          details: "當角色血量降低至混亂標記後會進入混亂。混亂狀態下角色無法行動，且物理抗性暫時變為「脆弱」。若在混亂中受傷過多，會進入程度更深的「混亂+」甚至是「混亂++」。"
        },
        {
          title: "罪惡共鳴 (Resonance)",
          icon: <Sparkles size={18} />,
          details: "當連續使用多個同屬性技能時會產生共鳴。完全共鳴（至少三個同色）能大幅強化技能數值。這是配置技能路徑時需要考量的重要策略因素。"
        }
      ]
    }
  ];

  return (
    <section className="space-y-12">
      <div>
        <SectionHeading subtitle="Combat Manual v2.0">深度戰鬥機制指南</SectionHeading>
        <Card className="mb-8">
          <p className="text-gray-300 leading-relaxed text-sm">
            本手冊詳細解析了 <span className="text-[#8b0000] font-bold">Limbus Company</span> 的戰鬥體系。
            掌握這套融合了「機率硬幣」、「屬性克制」與「資源管理」的高難度策略系統，是帶領罪人存活的關鍵。
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mechanicsGroups.map((group) => (
            <div key={group.id} className="space-y-6">
              <h3 className="text-xs font-mono font-bold text-[#8b0000] tracking-widest border-l-4 border-[#8b0000] pl-3 uppercase">
                {group.label}
              </h3>
              <div className="space-y-4">
                {group.items.map((item, idx) => (
                  <div key={idx} className="group p-5 bg-black/40 border border-[#333] hover:border-[#d4af37]/40 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-[#d4af37] group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="font-bold text-sm text-[#e0e0e0]">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#8b0000]/5 border border-[#8b0000]/20 p-8">
        <h3 className="text-[#d4af37] font-bold mb-4 flex items-center gap-2 text-sm">
          <Info size={16} /> 戰場重要提示 (Tactical Hints)
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400">
          <li className="flex gap-2">
            <span className="text-[#8b0000]">•</span>
            <span>「拼點」勝負往往決定戰局。若勝算為「絕望」或「不利」，建議使用防禦技能或 E.G.O 來止損。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#8b0000]">•</span>
            <span>E.G.O 不僅威力強大，還能瞬間改變抗性，甚至對低理智角色進行「侵蝕」控制。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#8b0000]">•</span>
            <span>擊碎敵方的混亂門檻，可以在下一回合創造爆發傷害的機會（All-in Window）。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#8b0000]">•</span>
            <span>留意敵我的「速度」。速度快的人格可以透過「攔截」來保護受傷嚴重的隊友。</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function GachaSection() {
  const [results, setResults] = React.useState<{ name: string; rarity: string; type: string }[]>([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [pityCount, setPityCount] = React.useState(0);
  const [totalPulls, setTotalPulls] = React.useState(0);

  const performDraw = (count: number) => {
    setIsDrawing(true);
    setResults([]);
    setTotalPulls(prev => prev + count);

    // Collect all available items
    const pool000: any[] = [];
    const pool00: any[] = [];
    const pool0: any[] = [];
    const poolEGO: any[] = [];
    const poolAnnouncer: any[] = ANNOUNCERS.map(a => ({ ...a, type: '播報員' }));

    SINNERS.forEach(sinner => {
      sinner.identities.forEach(id => {
        const item = { name: `${sinner.name} - ${id.name}`, rarity: id.rarity, type: '人格' };
        if (id.rarity === '000') pool000.push(item);
        else if (id.rarity === '00') pool00.push(item);
        else if (id.rarity === '0') pool0.push(item);
      });
      sinner.egos.forEach(ego => {
        poolEGO.push({ name: `${sinner.name} - ${ego.name}`, rarity: ego.rank || 'EGO', type: 'E.G.O' });
      });
    });

    const newResults = [];
    for (let i = 0; i < count; i++) {
      const rand = Math.random() * 100;
      let selected;

      // Simple implementation of rates matching the requested ones
      if (rand < 1.3) {
        selected = poolEGO[Math.floor(Math.random() * poolEGO.length)];
      } else if (rand < 2.6) {
        selected = poolAnnouncer[Math.floor(Math.random() * poolAnnouncer.length)];
      } else if (rand < 5.5) {
        selected = pool000[Math.floor(Math.random() * pool000.length)];
      } else if (rand < 18.3) {
        selected = pool00[Math.floor(Math.random() * pool00.length)];
      } else {
        selected = pool0[Math.floor(Math.random() * pool0.length)];
      }
      
      if (selected) newResults.push(selected);
    }

    setTimeout(() => {
      setResults(newResults);
      setIsDrawing(false);
    }, 800);
  };

  const resetGacha = () => {
    setResults([]);
    setTotalPulls(0);
  };

  return (
    <section className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3 space-y-6">
          <SectionHeading subtitle="Extraction Center">提取中心</SectionHeading>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-black/60 border border-[#333] p-3 text-center">
              <div className="text-[10px] text-gray-500 uppercase font-mono">總提取次數</div>
              <div className="text-xl font-bold text-white font-mono">{totalPulls}</div>
            </div>
            <button 
              onClick={resetGacha}
              className="flex items-center justify-center gap-2 text-[10px] text-gray-400 hover:text-white border border-[#333] hover:border-white transition-all uppercase font-mono"
            >
              <Activity size={12} /> 重置數據
            </button>
          </div>

          <Card title="今日提取概率 (Rates)">
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex justify-between border-b border-[#333] pb-1">
                <span className="text-[#d4af37] font-bold">★★★ (000 人格)</span>
                <span>2.9%</span>
              </div>
              <div className="flex justify-between border-b border-[#333] pb-1">
                <span className="text-blue-400 font-bold">★★ (00 人格)</span>
                <span>12.8%</span>
              </div>
              <div className="flex justify-between border-b border-[#333] pb-1">
                <span className="text-[#8b0000] font-bold">E.G.O</span>
                <span>1.3%</span>
              </div>
              <div className="flex justify-between border-b border-[#333] pb-1 text-lc-gold font-bold">
                <span>播報員 (Announcer)</span>
                <span>1.3%</span>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              disabled={isDrawing}
              onClick={() => performDraw(1)}
              className="py-4 bg-black border border-[#333] hover:border-[#d4af37] text-white font-bold transition-all disabled:opacity-50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#d4af37]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              單次提取
            </button>
            <button
              disabled={isDrawing}
              onClick={() => performDraw(10)}
              className="py-4 bg-[#8b0000] text-white font-bold hover:bg-[#8b0000]/80 transition-all disabled:opacity-50 shadow-lg shadow-[#8b0000]/20 flex flex-col items-center justify-center"
            >
              <span>十連提取</span>
              <span className="text-[10px] font-normal opacity-70">必得一款 ★★ 以上</span>
            </button>
          </div>

          <Card title="管理者筆記">
            <p className="text-[10px] text-gray-500 leading-relaxed italic">
              「每一次提取都是對平行世界的探求。我們正在將那些支離破碎的可能性，重新編織進這輛巴士的現實之中。」
            </p>
          </Card>
        </div>

        <div className="md:w-2/3 min-h-[500px] border border-[#333] bg-black/60 p-8 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#8b0000_1px,_transparent_1px)] bg-[size:30px_30px]"></div>
          </div>

          {isDrawing ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-[#d4af37]/20 rounded-full animate-ping absolute inset-0"></div>
                <div className="w-20 h-20 border-t-2 border-r-2 border-[#d4af37] rounded-full animate-spin"></div>
              </div>
              <div className="text-[#d4af37] font-mono animate-pulse font-bold tracking-[0.3em] text-lg">ENRICHING POSSIBILITIES...</div>
              <div className="text-[10px] text-gray-600 font-mono">ESTABLISHING LINK TO THE LAKE...</div>
            </div>
          ) : results.length > 0 ? (
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {results.map((item, idx) => {
                const isRare = item.rarity === '000' || item.type === 'E.G.O' || item.type === '播報員';
                const isEpic = item.rarity === '00';
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5, filter: 'brightness(2)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
                    transition={{ 
                      type: 'spring',
                      damping: 15,
                      stiffness: 100,
                      delay: idx * 0.08 
                    }}
                    className={`relative p-4 border aspect-[2/3] flex flex-col items-center justify-center text-center transition-all group hover:scale-105 z-10 ${
                      isRare 
                        ? 'border-[#d4af37] bg-[#d4af37]/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                        : isEpic 
                        ? 'border-blue-500/50 bg-blue-500/10' 
                        : 'border-gray-800 bg-black/40'
                    }`}
                  >
                    {isRare && (
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shine_3s_infinite] pointer-events-none"></div>
                    )}
                    
                    <div className={`text-[9px] uppercase font-bold mb-2 tracking-widest ${
                      item.type === 'E.G.O' ? 'text-red-500' : 
                      item.type === '播報員' ? 'text-lc-gold' : 
                      isRare ? 'text-[#d4af37]' : isEpic ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {item.type}
                    </div>

                    <div className="text-sm text-white font-bold mb-1 leading-tight min-h-[2.5rem] flex items-center justify-center">
                      {item.name.includes(' - ') ? item.name.split(' - ')[1] : item.name}
                    </div>

                    <div className="text-[10px] text-gray-500 font-medium mb-4">
                      {item.name.includes(' - ') ? item.name.split(' - ')[0] : ''}
                    </div>

                    <div className={`mt-auto px-2 py-0.5 font-mono text-[10px] font-bold rounded-sm ${
                      isRare ? 'bg-[#d4af37] text-black' : 
                      isEpic ? 'bg-blue-900/50 text-blue-300' : 
                      'bg-gray-900 text-gray-500'
                    }`}>
                      {item.rarity === '000' ? '★★★' : 
                       item.rarity === '00' ? '★★' : 
                       item.rarity === '0' ? '★' : 'SPEC'}
                    </div>

                    {isRare && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -inset-[1px] border border-[#d4af37] pointer-events-none"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
              <div className="relative mb-6">
                <Sparkles size={64} className="opacity-10 animate-pulse" />
                <div className="absolute inset-0 bg-[#d4af37]/5 blur-2xl rounded-full"></div>
              </div>
              <h4 className="text-[#e0e0e0] font-bold mb-2">準備進行可能性提取</h4>
              <p className="text-xs italic max-w-xs text-center leading-relaxed">
                鏡中的世界正閃爍著無數的交匯點...<br/>
                請選擇提取次數以建立連結。
              </p>
            </div>
          )}
          
          {!isDrawing && results.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center"
            >
              <div className="text-[10px] text-gray-500 font-mono uppercase">
                Extraction Protocol Sequence Completed
              </div>
              <button 
                onClick={() => setResults([])}
                className="text-xs text-[#d4af37] hover:underline transition-all"
              >
                確 認
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </section>
  );
}
