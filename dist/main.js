const root = document.querySelector('#root');

if (!root) throw new Error('App root element was not found.');

const offices = [
  { id: 'swire-hk', business: 'Swire Group', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'John Swire & Sons (H.K.)', localName: '太古集團香港總部', address: '31/F, One Pacific Place, 88 Queensway, Hong Kong', localAddress: '香港金鐘道88號太古廣場一座31樓', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-properties-hk', business: 'Swire Properties', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'Swire Properties', localName: '太古地產', address: '64/F, One Island East, Taikoo Place, 18 Westlands Road, Quarry Bay, Hong Kong', localAddress: '香港鰂魚涌華蘭路18號太古坊港島東中心64樓', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swireproperties.com/en/contact-us/' },
  { id: 'swire-cocacola-hk', business: 'Swire Coca-Cola', city: 'Hong Kong', region: 'New Territories', country: 'Hong Kong', name: 'Swire Coca-Cola Hong Kong', localName: '太古可口可樂香港', address: '17–19 Yuen Shun Circuit, Siu Lek Yuen, Sha Tin, New Territories, Hong Kong', localAddress: '香港新界沙田小瀝源源順圍17至19號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swire.com/en/contact/all_offices.php?by=alphabetic&v=r-s' },
  { id: 'haeco-hk', business: 'HAECO', city: 'Hong Kong', region: 'Lantau / Airport', country: 'Hong Kong', name: 'HAECO Hong Kong', localName: '香港飛機工程有限公司', address: '80 South Perimeter Road, Hong Kong International Airport, Lantau, Hong Kong', localAddress: '香港大嶼山香港國際機場南環路80號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.haeco.com/en/about/haeco-group/haeco-hong-kong' },
  { id: 'swire-london', business: 'Swire Group', city: 'London', region: 'United Kingdom', country: 'United Kingdom', name: 'John Swire & Sons', localName: 'John Swire & Sons', address: 'Swire House, 59 Buckingham Gate, London SW1E 6AJ, United Kingdom', localAddress: 'Swire House, 59 Buckingham Gate, London SW1E 6AJ', timezone: 'Europe/London', mode: 'transit', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-beijing', business: 'Swire Group', city: 'Beijing', region: 'Chinese Mainland', country: 'China', name: 'John Swire & Sons (China)', localName: '太古（中国）有限公司', address: '2/F, ONE INDIGO, 20 Jiuxianqiao Road, Chaoyang District, Beijing 100016, China', localAddress: '中国北京市朝阳区酒仙桥路20号颐堤港一座2层', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-shanghai', business: 'Swire Group', city: 'Shanghai', region: 'Chinese Mainland', country: 'China', name: 'Swire Shanghai Management', localName: '太古（上海）管理有限公司', address: 'Unit 2706, HKRI Centre Tower 2, 288 Shimen 1st Road, Jing’an District, Shanghai 200041, China', localAddress: '中国上海市静安区石门一路288号兴业太古汇香港兴业中心二座2706室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swire.com/en/about/_fast-facts/fastfacts.pdf' },
  { id: 'swire-properties-guangzhou', business: 'Swire Properties', city: 'Guangzhou', region: 'Chinese Mainland', country: 'China', name: 'Taikoo Hui Guangzhou', localName: '广州太古汇', address: 'Suite 1801, Taikoo Hui Tower 1, 385 Tianhe Road, Tianhe District, Guangzhou, China', localAddress: '中国广州市天河区天河路385号太古汇一座1801室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swireproperties.com/en/contact-us/' },
  { id: 'swire-singapore', business: 'Swire Group', city: 'Singapore', region: 'Singapore', country: 'Singapore', name: 'John Swire & Sons (S.E. Asia)', localName: 'John Swire & Sons (S.E. Asia)', address: '300 Beach Road, The Concourse #12-06, Singapore 199555', localAddress: '300 Beach Road, The Concourse #12-06, Singapore 199555', timezone: 'Asia/Singapore', mode: 'transit', source: 'https://www.swire.com/en/about/_fast-facts/fastfacts.pdf' },
  { id: 'swire-bangkok', business: 'Swire Group', city: 'Bangkok', region: 'Thailand', country: 'Thailand', name: 'Swire Thailand Representative Office', localName: 'Swire Thailand Representative Office', address: 'Unit 3302, 33/F, One City Centre, 548 Phloen Chit Road, Pathum Wan, Bangkok 10330, Thailand', localAddress: 'One City Centre, 548 Phloen Chit Road, Bangkok 10330', timezone: 'Asia/Bangkok', mode: 'transit', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-hcmc', business: 'Swire Group', city: 'Ho Chi Minh City', region: 'Vietnam', country: 'Vietnam', name: 'Swire Vietnam Representative Office', localName: 'Swire Vietnam Representative Office', address: 'Suite 1407, Level 14, Tower 1, Saigon Centre, 65 Le Loi Boulevard, Ho Chi Minh City, Vietnam', localAddress: 'Saigon Centre, 65 Le Loi Boulevard, Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh', mode: 'driving', source: 'https://www.swire.com/en/about/overview.php' },
  { id: 'swire-miami', business: 'Swire Properties', city: 'Miami', region: 'United States', country: 'United States', name: 'Swire Properties USA', localName: 'Swire Properties USA', address: '98 SE 7th Street, Suite 500, Miami, FL 33131, United States', localAddress: '98 SE 7th Street, Suite 500, Miami, FL 33131', timezone: 'America/New_York', mode: 'driving', source: 'https://www.swireproperties.com/en/contact-us/' },
  { id: 'haeco-xiamen', business: 'HAECO', city: 'Xiamen', region: 'Chinese Mainland', country: 'China', name: 'HAECO Xiamen', localName: '厦门太古飞机工程有限公司', address: '20 Dailiao Road, Xiamen Gaoqi International Airport, Xiamen 361006, Fujian, China', localAddress: '中国福建省厦门市厦门高崎国际机场大宁路20号，邮编361006', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.haeco.com/en/about/group-locations' },
  { id: 'swireproperties-sanlitun', business: 'Swire Properties', city: 'Beijing', region: 'Chinese Mainland', country: 'China', name: 'Taikoo Li Sanlitun', localName: '三里屯太古里', address: 'Floor 4, Building 2, 11 Sanlitun Road, Chaoyang District, Beijing, China', localAddress: '中国北京市朝阳区三里屯路11号院2号楼4层', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swireproperties.com/zh-cn/contact-us/' },
  { id: 'swireproperties-chengdu', business: 'Swire Properties', city: 'Chengdu', region: 'Chinese Mainland', country: 'China', name: 'Taikoo Li Chengdu', localName: '成都太古里', address: '8 Zhongshamao Street, Jinjiang District, Chengdu, Sichuan, China', localAddress: '中国成都市锦江区中纱帽街8号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swireproperties.com/zh-cn/contact-us/' },
  { id: 'swireproperties-qiantan', business: 'Swire Properties', city: 'Shanghai', region: 'Chinese Mainland', country: 'China', name: 'Taikoo Li Qiantan', localName: '前滩太古里', address: 'Unit 801, 8/F, Qiantan Center, 588 Dongyu Road, Pudong District, Shanghai, China', localAddress: '中国上海市浦东新区东育路588号前滩中心8楼801室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swireproperties.com/zh-cn/contact-us/' },
  { id: 'swireproperties-xian', business: 'Swire Properties', city: "Xi'an", region: 'Chinese Mainland', country: 'China', name: "Taikoo Li Xi'an (under construction, due 2027)", localName: '西安太古里（建设中，预计2027年竣工）', address: 'Xiaoyanta Historic & Cultural District, south of Youyi Road, west of Chang’an Road, Beilin District, Xi’an, Shaanxi, China', localAddress: '中国陕西省西安市碑林区小雁塔历史文化片区（友谊路以南、长安路以西）', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swireproperties.com/en/portfolio/future-developments/other-future-developments/#taikoo-li-xian' },
  { id: 'swireproperties-shenzhen', business: 'Swire Properties', city: 'Shenzhen', region: 'Chinese Mainland', country: 'China', name: 'Upper House Shenzhen (under construction, due 2027)', localName: '深圳居舍（建设中，预计2027年开业）', address: 'Near Shenzhen Bay Super Headquarters Base, Shenzhen Bay area, Nanshan District, Shenzhen, Guangdong, China', localAddress: '中国广东省深圳市南山区深圳湾超级总部基地附近', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swireproperties.com/en/portfolio/future-developments/other-future-developments/#upper-house-shenzhen' },
  { id: 'swireproperties-jakarta', business: 'Swire Properties', city: 'Jakarta', region: 'Indonesia', country: 'Indonesia', name: 'Swire Properties Jakarta', localName: 'Swire Properties Jakarta', address: 'Jl Wijaya II No. 37A, Kebayoran Baru, Jakarta Selatan, Jakarta 12160, Indonesia', localAddress: 'Jl Wijaya II No. 37A, Kebayoran Baru, Jakarta Selatan 12160', timezone: 'Asia/Jakarta', mode: 'driving', source: 'https://www.swireproperties.com/en/contact-us/' },
  { id: 'cathay-pacific-city', business: 'Swire Pacific', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'Cathay Pacific Airways', localName: '國泰航空', address: 'Cathay Pacific City, 8 Scenic Road, Hong Kong International Airport, Lantau, Hong Kong', localAddress: '香港大嶼山香港國際機場翔天路8號國泰航空大廈', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'steamships-portmoresby', business: 'Steamships Trading Company', city: 'Port Moresby', region: 'Papua New Guinea', country: 'Papua New Guinea', name: 'Steamships Trading Company', localName: 'Steamships Trading Company', address: '@345 Building, Levels 1-2, Stanley Esplanade, Section 20, Allotments 3, 4 and 5, Port Moresby, NCD, Papua New Guinea', localAddress: '@345 Building, Stanley Esplanade, Port Moresby, NCD', timezone: 'Pacific/Port_Moresby', mode: 'driving', source: 'https://www.steamships.com.pg/contact/' },
  { id: 'uscold-camden', business: 'US Cold Storage', city: 'Camden', region: 'United States', country: 'United States', name: 'United States Cold Storage', localName: 'United States Cold Storage', address: 'Ferry Terminal Building, 2 Aquarium Drive, Suite 400, Camden, NJ 08103, United States', localAddress: '2 Aquarium Drive, Suite 400, Camden, NJ 08103', timezone: 'America/New_York', mode: 'driving', source: 'http://uscold.com/facilities/' },
  { id: 'finlays-kericho', business: 'Finlays', city: 'Kericho', region: 'Kenya', country: 'Kenya', name: 'James Finlay Kenya', localName: 'James Finlay Kenya', address: 'James Finlay Kenya, PO Box 223, Chepkembe, Kericho, Kenya', localAddress: 'PO Box 223, Chepkembe, Kericho', timezone: 'Africa/Nairobi', mode: 'driving', source: 'https://www.finlays.net/contact-us/' },
  { id: 'finlays-mombasa', business: 'Finlays', city: 'Mombasa', region: 'Kenya', country: 'Kenya', name: 'Finlays Mombasa', localName: 'Finlays Mombasa', address: 'Shimanzi, Mashundu Street, Mombasa, Kenya', localAddress: 'Shimanzi, Mashundu Street, Mombasa', timezone: 'Africa/Nairobi', mode: 'driving', source: 'https://www.finlays.net/contact-us/' },
  { id: 'finlays-dubai', business: 'Finlays', city: 'Dubai', region: 'United Arab Emirates', country: 'United Arab Emirates', name: 'Finlays Dubai', localName: 'Finlays Dubai', address: 'Jebel Ali Free Zone - South, Dubai, United Arab Emirates', localAddress: 'Jebel Ali Free Zone - South, Dubai', timezone: 'Asia/Dubai', mode: 'transit', source: 'https://www.finlays.net/contact-us/' },
  { id: 'finlays-hull', business: 'Finlays', city: 'Hull', region: 'United Kingdom', country: 'United Kingdom', name: 'Finlays Hull', localName: 'Finlays Hull', address: '60 Lime Street, Hull, United Kingdom', localAddress: '60 Lime Street, Hull', timezone: 'Europe/London', mode: 'driving', source: 'https://www.finlays.net/contact-us/' },
  { id: 'swirewater-saltlakecity', business: 'Swire Water', city: 'Salt Lake City', region: 'United States', country: 'United States', name: 'Swire Water', localName: 'Swire Water', address: '3665 South West Temple, Salt Lake City, UT 84115, United States', localAddress: '3665 South West Temple, Salt Lake City, UT 84115', timezone: 'America/Denver', mode: 'driving', source: 'https://www.swirewater.com/contact' },
  { id: 'swirepacific-hotelholdings', business: 'Swire Properties', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'Swire Properties Hotel Holdings Ltd.', localName: '太古地產酒店控股有限公司', address: "Suite 2701-05, Cityplaza One, 1111 King's Road, Hong Kong", localAddress: '香港鰂魚涌英皇道1111號太古城中心一座2701-05室', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-hq', business: 'Swire Coca-Cola', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'Swire Coca-Cola Ltd. (Regional HQ)', localName: '太古可口可樂有限公司', address: "33/F Dorset House, Taikoo Place, 979 King's Road, Quarry Bay, Hong Kong", localAddress: '香港鰂魚涌英皇道979號太古坊多實大廈33樓', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-bcd-beijing', business: 'Swire Coca-Cola', city: 'Beijing', region: 'Chinese Mainland', country: 'China', name: 'Swire BCD Co. Ltd.', localName: '太古饮料（北京）有限公司', address: '3/F, Unit 301, Room 312, One Indigo, 20 Jiuxianqiao Road, Chaoyang District, Beijing 100016, China', localAddress: '中国北京市朝阳区酒仙桥路20号颐堤港301单元3层312室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-shenmei-shanghai', business: 'Swire Coca-Cola', city: 'Shanghai', region: 'Chinese Mainland', country: 'China', name: 'Shanghai Shen-Mei Beverage & Food Co. / Swire Coca-Cola (China) Co.', localName: '上海申美饮料食品有限公司 / 太古可口可乐（中国）有限公司', address: '539 Guiqiao Road, Pudong Jinqiao Export Processing Zone, Shanghai, China 201206', localAddress: '中国上海市浦东金桥出口加工区桂桥路539号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-guangxi', business: 'Swire Coca-Cola', city: 'Nanning', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Guangxi Limited', localName: '太古可口可乐广西有限公司', address: '18 West Chuangxin Road, High and New Tech Industrial Development Zone, Nanning, Guangxi, China 530007', localAddress: '中国广西南宁市高新技术产业开发区创新西路18号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-hainan', business: 'Swire Coca-Cola', city: 'Haikou', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Hainan Limited', localName: '太古可口可乐海南有限公司', address: 'No. 155 Binhai Avenue, Xiuying District, Haikou, Hainan, China 570311', localAddress: '中国海南海口市秀英区滨海大道155号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-hefei', business: 'Swire Coca-Cola', city: 'Hefei', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Hefei Ltd.', localName: '太古可口可乐合肥有限公司', address: '1370 Lianhua Road, Hefei Economic & Technological Development Zone, Hefei, Anhui, China 230601', localAddress: '中国安徽合肥市经济技术开发区莲花路1370号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-hubei', business: 'Swire Coca-Cola', city: 'Wuhan', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Hubei Limited', localName: '太古可口可乐湖北有限公司', address: '59 South Che Cheng Road, Wuhan Economic and Technical Development Zone, Wuhan, Hubei, China 430056', localAddress: '中国湖北武汉市经济技术开发区车城南路59号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-jiangsu', business: 'Swire Coca-Cola', city: 'Nanjing', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Jiangsu Limited', localName: '太古可口可乐江苏有限公司', address: "26 Xinke'er Road, Jiangbei New Area, Nanjing, Jiangsu, China", localAddress: '中国江苏南京市江北新区新科尔路26号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-jiangxi', business: 'Swire Coca-Cola', city: 'Nanchang', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Jiangxi Limited', localName: '太古可口可乐江西有限公司', address: '1318 Jin Sha Road, Xiaolan Economic Development Zone, Nanchang, Jiangxi, China 330052', localAddress: '中国江西南昌市小蓝经济开发区金沙路1318号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-luohe', business: 'Swire Coca-Cola', city: 'Luohe', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Luohe Ltd.', localName: '太古可口可乐漯河有限公司', address: '1 Weiyi Road, Economic Development Zone, Luohe, Henan, China 462000', localAddress: '中国河南漯河市经济开发区纬一路1号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-xiamen', business: 'Swire Coca-Cola', city: 'Xiamen', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Xiamen Ltd.', localName: '太古可口可乐厦门有限公司', address: '99 Jinhu Road, Xiamen, Fujian, China 361009', localAddress: '中国福建厦门市金湖路99号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-yunnan', business: 'Swire Coca-Cola', city: 'Kunming', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Yunnan Limited', localName: '太古可口可乐云南有限公司', address: '17/F Zhi Lifang Building, 99 Xinyun Avenue, Changyuan Road, New & Hi-Tech Development Zone, Kunming, Yunnan, China 650106', localAddress: '中国云南昆明市高新技术开发区长源路新运大道99号智利方大厦17楼', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-zhejiang', business: 'Swire Coca-Cola', city: 'Hangzhou', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Zhejiang Ltd.', localName: '太古可口可乐浙江有限公司', address: 'No. 18, 8th Avenue & 1-2 Floors, Block 3, No. 12, 11th Avenue, Hangzhou Economic & Technological Development Area, Zhejiang, China', localAddress: '中国浙江杭州经济技术开发区11大街12号3幢1-2层及8大街18号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-zhengzhou', business: 'Swire Coca-Cola', city: 'Zhengzhou', region: 'Chinese Mainland', country: 'China', name: 'Swire Coca-Cola Beverages Zhengzhou Ltd.', localName: '太古可口可乐郑州有限公司', address: '68 Kexue Avenue, High & New Technology Industries Development Zone, Zhengzhou, Henan, China 450001', localAddress: '中国河南郑州市高新技术产业开发区科学大道68号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-taiwan', business: 'Swire Coca-Cola', city: 'Taoyuan', region: 'Taiwan', country: 'Taiwan', name: 'Swire Coca-Cola (Taiwan region)', localName: '太古可口可樂（台灣）', address: '46 Hsing Pang Road, Taoyuan District 330, Taoyuan City, Taiwan region', localAddress: '台灣桃園市桃園區興邦路46號', timezone: 'Asia/Taipei', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-guangdong', business: 'Swire Coca-Cola', city: 'Guangzhou', region: 'Chinese Mainland', country: 'China', name: 'Swire Guangdong Coca-Cola Ltd.', localName: '太古广东可口可乐有限公司', address: 'No. 998 Huangpu Road East, Guangzhou, Guangdong, China 510700', localAddress: '中国广东广州市黄埔大道东998号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cocacola-zhanjiang', business: 'Swire Coca-Cola', city: 'Zhanjiang', region: 'Chinese Mainland', country: 'China', name: 'Swire Guangdong Coca-Cola Zhanjiang Limited', localName: '太古广东可口可乐湛江有限公司', address: '8 Lejin Road, Zhanjiang Economic & Technology Development Zone, Zhanjiang, Guangdong, China 524000', localAddress: '中国广东湛江市经济技术开发区乐进路8号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-luquan-xiamen', business: 'Swire Coca-Cola', city: 'Xiamen', region: 'Chinese Mainland', country: 'China', name: 'Xiamen Luquan Industries Co. Ltd.', localName: '厦门鹭泉实业有限公司', address: "No. 1355 Tongji Road, Tong'an, Xiamen, Fujian, China 361100", localAddress: '中国福建厦门市同安区同集路1355号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cathayhouse', business: 'Cathay Pacific', city: 'Hong Kong', region: 'Lantau / Airport', country: 'Hong Kong', name: 'Cathay House Group (AHK Air Hong Kong / Hong Kong Airport Services / Hong Kong Express Airways)', localName: 'AHK Air Hong Kong ／ 香港機場服務 ／ 香港快運航空', address: 'Cathay House, 11 Tung Fai Road, Hong Kong International Airport, Lantau, Hong Kong', localAddress: '香港大嶼山香港國際機場同慧路11號國泰大廈', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cathay-catering', business: 'Cathay Pacific', city: 'Hong Kong', region: 'Lantau / Airport', country: 'Hong Kong', name: 'Cathay Pacific Catering Services (H.K.) Ltd.', localName: '國泰航空膳食服務（香港）有限公司', address: '11 Catering Road East, Hong Kong International Airport, Lantau, Hong Kong', localAddress: '香港大嶼山香港國際機場餐膳道東11號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cathay-services', business: 'Cathay Pacific', city: 'Hong Kong', region: 'Lantau / Airport', country: 'Hong Kong', name: 'Cathay Pacific Services Ltd.', localName: '國泰服務有限公司', address: '3 Chun Wan Road, Hong Kong International Airport, Lantau, Hong Kong', localAddress: '香港大嶼山香港國際機場秤灣路3號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cebupacific', business: 'Cathay Pacific', city: 'Lapu-Lapu City', region: 'Philippines', country: 'Philippines', name: 'Cebu Pacific Catering Services Inc.', localName: 'Cebu Pacific Catering Services Inc.', address: '1st Avenue Extension, Block B6, Mactan Economic Zone 1, Lapu-Lapu City 6015, Philippines', localAddress: '1st Avenue Extension, Block B6, Mactan Economic Zone 1, Lapu-Lapu City 6015, Philippines', timezone: 'Asia/Manila', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-chinapacific-laundry', business: 'Aviation Services', city: 'Taoyuan', region: 'Taiwan', country: 'Taiwan', name: 'China Pacific Laundry Services Ltd.', localName: '中太洗衣服務有限公司', address: 'No. 7 Lane 54 San Te Street, Lin 11 Keng-Kou Tsuen, Lu Chu Township, Taoyuan 338, Taiwan region', localAddress: '台灣桃園市蘆竹鄉坑口村11鄰三德街54巷7號', timezone: 'Asia/Taipei', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cls-toronto', business: 'Aviation Services', city: 'Mississauga', region: 'Canada', country: 'Canada', name: 'CLS Catering Services Ltd. – Toronto Office', localName: 'CLS Catering Services Ltd. – Toronto Office', address: '2950 Convair Drive, Toronto International Airport, Mississauga, Ontario, Canada L5P 1A2', localAddress: '2950 Convair Drive, Toronto International Airport, Mississauga, Ontario, Canada L5P 1A2', timezone: 'America/Toronto', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-cls-vancouver', business: 'Aviation Services', city: 'Richmond', region: 'Canada', country: 'Canada', name: 'CLS Catering Services Ltd. – Vancouver Office', localName: 'CLS Catering Services Ltd. – Vancouver Office', address: '3560 Jericho Road, Vancouver International Airport, Richmond, British Columbia, Canada V7B 1C2', localAddress: '3560 Jericho Road, Vancouver International Airport, Richmond, British Columbia, Canada V7B 1C2', timezone: 'America/Vancouver', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-goodrich-asiapacific', business: 'HAECO', city: 'Hong Kong', region: 'New Territories', country: 'Hong Kong', name: 'Goodrich Asia-Pacific Ltd.', localName: '固特異亞太有限公司', address: '1/F, 80 Chun Choi Street, Tseung Kwan O Industrial Estate, Tseung Kwan O, Hong Kong', localAddress: '香港將軍澳工業區駿才街80號1樓', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-haecs-jinjiang', business: 'HAECO', city: 'Jinjiang', region: 'Chinese Mainland', country: 'China', name: 'HAECO Composite Structures (Jinjiang) Co. Ltd.', localName: '晋江太古复合材料有限公司', address: '1 Taikoo Road, Quanzhou Export Processing Zone, Jinjiang, Fujian, China 362200', localAddress: '中国福建晋江市泉州出口加工区太古路1号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-haesl', business: 'HAESL', city: 'Hong Kong', region: 'New Territories', country: 'Hong Kong', name: 'Hong Kong Aero Engine Services Ltd. (HAESL)', localName: '香港飛機發動機維修服務有限公司', address: '70 Chun Choi Street, Tseung Kwan O Industrial Estate, Tseung Kwan O, New Territories, Hong Kong', localAddress: '香港新界將軍澳工業區駿才街70號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-shanghai-taikoo-aircraft', business: 'HAECO', city: 'Shanghai', region: 'Chinese Mainland', country: 'China', name: 'Shanghai Taikoo Aircraft Engineering Services Co. Ltd.', localName: '上海太古飞机工程有限公司', address: 'Room 109, No. 1 Linghang Road, Pudong International Airport, Pudong New Area, Shanghai, China 201207', localAddress: '中国上海市浦东新区浦东国际机场临港路1号109室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-sichuan-aircraft', business: 'HAECO', city: 'Chengdu', region: 'Chinese Mainland', country: 'China', name: 'Sichuan Aircraft Maintenance Engineering Co. Ltd. (SAME)', localName: '四川飞机维修工程有限公司', address: 'Shuangliu International Airport, Chengdu, Sichuan, China 610202', localAddress: '中国四川成都市双流国际机场', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-engine-xiamen', business: 'HAECO', city: 'Xiamen', region: 'Chinese Mainland', country: 'China', name: 'Taikoo Engine Services (Xiamen) Co. Ltd.', localName: '太古发动机维修服务（厦门）有限公司', address: 'No.5 Gaoqi Nan 3 Road, Huli District, Xiamen, Fujian, China 361006', localAddress: '中国福建厦门市湖里区高崎南三路5号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-shandong-aircraft', business: 'HAECO', city: 'Jinan', region: 'Chinese Mainland', country: 'China', name: 'Taikoo (Shandong) Aircraft Engineering Co. Ltd.', localName: '太古（山东）飞机工程有限公司', address: 'Yaoqiang International Airport, Jinan, Shandong, China 250107', localAddress: '中国山东济南市遥墙国际机场', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-landinggear-xiamen', business: 'HAECO', city: 'Xiamen', region: 'Chinese Mainland', country: 'China', name: 'Taikoo (Xiamen) Landing Gear Services Co. Ltd.', localName: '太古（厦门）起落架服务有限公司', address: '280 Gaoqi South 5th Road, Gaoqi International Airport, Xiamen, Fujian, China 361006', localAddress: '中国福建厦门市高崎国际机场高崎南五路280号', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-vogue-laundry', business: 'Aviation Services', city: 'Hong Kong', region: 'New Territories', country: 'Hong Kong', name: 'Vogue Laundry Service Ltd.', localName: '時尚洗衣服務有限公司', address: 'No. 95-99, Fuk Hi Street, Yuen Long Industrial Estate, Yuen Long, New Territories, Hong Kong', localAddress: '香港新界元朗工業區福喜街95-99號', timezone: 'Asia/Hong_Kong', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-taipeimotorgroup', business: 'Taikoo Motors', city: 'Taipei', region: 'Taiwan', country: 'Taiwan', name: 'Taikoo Motor Group (Bel Air Motors / Liberty Motors / Taikoo Motorcycle / Taikoo Motors / Yuntung Motors)', localName: '太古汽車集團（栢林汽車／利勃汽車／太古機車／太古汽車／運通汽車）', address: 'No. 287 Sec. 1 Jiuzong Road, Taipei 11494, Taiwan region', localAddress: '台灣台北市久宗路一段287號', timezone: 'Asia/Taipei', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-resources-kowloonbay', business: 'Swire Resources', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'Swire Resources Ltd. / Intermarket Agencies (Far East) Ltd.', localName: '太古資源有限公司／捷達（遠東）有限公司', address: '12 & 13/F Kingston International Centre, 19 Wang Chiu Road, Kowloon Bay, Hong Kong', localAddress: '香港九龍灣宏照道19號金巴利國際中心12及13樓', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-wongchukhang', business: 'Taikoo Sugar', city: 'Hong Kong', region: 'Hong Kong SAR', country: 'Hong Kong', name: 'International Automobiles Ltd. / Swire Foods Holdings Ltd. / Taikoo Sugar Ltd.', localName: '國際汽車有限公司／太古食品控股有限公司／太古糖業有限公司', address: '18/F South Island Place, 8 Wong Chuk Hang Road, Hong Kong', localAddress: '香港黃竹坑黃竹坑道8號南岸1號18樓', timezone: 'Asia/Hong_Kong', mode: 'transit', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-foods-chongqing', business: 'Swire Foods', city: 'Chongqing', region: 'Chinese Mainland', country: 'China', name: 'Swire Foods Trading (China) Ltd.', localName: '太古食品贸易（中国）有限公司', address: '27/F Block A, CR Plaza, 51 Xiejiawan Main Street, Jiulongpo District, Chongqing, China', localAddress: '中国重庆市九龙坡区谢家湾正街51号华润大厦A座27楼', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-resources-shanghai', business: 'Swire Resources', city: 'Shanghai', region: 'Chinese Mainland', country: 'China', name: 'Swire Resources (Shanghai) Trading Co. Ltd.', localName: '太古资源（上海）贸易有限公司', address: "Unit 1601, 16/F, KYMS Huiyin Building, 758 Nanjing West Road, Jing'an District, Shanghai 200041, China", localAddress: '中国上海市静安区南京西路758号会银大厦16楼1601室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-resources-guangzhou-branch', business: 'Swire Resources', city: 'Guangzhou', region: 'Chinese Mainland', country: 'China', name: 'Swire Resources (Shanghai) Trading Co. Ltd. – Guangzhou Branch', localName: '太古资源（上海）贸易有限公司广州分公司', address: 'Unit 1305, 13/F, Huayitai International Building, 418 Dongfengzhong Road, Yuexiu District, Guangzhou 510030, China', localAddress: '中国广州市越秀区东风中路418号华艺台国际大厦13楼1305室', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-supreme-motors', business: 'Taikoo Motors', city: 'Kaohsiung', region: 'Taiwan', country: 'Taiwan', name: 'Supreme Motors Ltd.', localName: '尊榮汽車有限公司', address: "55 Bo'ai 3rd Road, Kaohsiung, Taiwan region", localAddress: '台灣高雄市博愛三路55號', timezone: 'Asia/Taipei', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-commercial-vehicles', business: 'Taikoo Motors', city: 'Taoyuan', region: 'Taiwan', country: 'Taiwan', name: 'Taikoo Commercial Vehicles Ltd.', localName: '太古商用車有限公司', address: 'No. 489 Sec. 2 Zhongzheng Road, Zhongli District, Taoyuan 32051, Taiwan region', localAddress: '台灣桃園市中壢區中正路二段489號', timezone: 'Asia/Taipei', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' },
  { id: 'swirepacific-sugar-guangzhou', business: 'Taikoo Sugar', city: 'Guangzhou', region: 'Chinese Mainland', country: 'China', name: 'Taikoo Sugar (China) Ltd.', localName: '太古糖业（中国）有限公司', address: 'Block 10, 48 Xinye Road, Huangpu District, Guangzhou 511356, China', localAddress: '中国广州市黄埔区新业路48号10栋', timezone: 'Asia/Shanghai', mode: 'driving', source: 'https://www.swirepacific.com/en/contact-us/company-address' }
];

root.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Swire routes home"><span class="brand-mark">S</span><span>SWIRE <strong>ROUTES</strong></span></a>
    <span class="header-note">Executive journey planner</span>
  </header>
  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Plan with confidence</p>
        <h1>Your clearest route<br><em>to Swire.</em></h1>
        <p class="hero-text">From your door to the right office, with local routing and arrival advice built in.</p>
        <div class="network-stat"><strong>${offices.length}</strong><span>verified destinations<br>across the network</span></div>
      </div>
      <form class="planner" id="route-form">
        <div class="step-heading"><span>01</span><div><strong>Where are you starting?</strong><small>Enter an address or share your current location.</small></div></div>
        <label class="field-label" for="origin">Starting point</label>
        <div class="input-row">
          <input id="origin" name="origin" type="text" value="Tung Chung, Hong Kong" autocomplete="street-address" placeholder="Airport, hotel or address" required>
          <button class="locate-button" id="locate" type="button" aria-label="Use current location" title="Use current location"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"></path></svg></button>
        </div>
        <p class="field-status" id="location-status" aria-live="polite"></p>
        <div class="step-heading destination-heading"><span>02</span><div><strong>Choose your destination</strong><small>Official Swire office and operating-company locations.</small></div></div>
        <label class="field-label" for="destination">Swire location</label>
        <select id="destination" name="destination" required><option value="">Select an office</option></select>
        <button class="primary-button" type="submit">Build my route <span>→</span></button>
      </form>
    </section>
    <section class="results" id="results" hidden aria-live="polite">
      <div class="results-heading"><div><p class="eyebrow">Your journey</p><h2 id="route-title"></h2></div><div class="local-time"><span>Local time</span><strong id="local-time">—</strong></div></div>
      <div class="result-grid">
        <article class="route-card card">
          <div class="card-kicker">Recommended route</div>
          <div class="route-line"><span class="route-dot start"></span><div><small>START</small><strong id="route-origin"></strong></div></div>
          <div class="route-track"></div>
          <div class="route-line"><span class="route-dot finish"></span><div><small>DESTINATION</small><strong id="route-destination"></strong><p id="route-address"></p></div></div>
          <div class="route-advice" id="route-advice"></div><div class="map-actions" id="map-actions"></div>
        </article>
        <article class="context-card card"><div class="card-kicker">Local intelligence</div><div id="context-content"></div></article>
        <article class="brief-card card">
          <div class="card-kicker">Executive arrival card</div><div class="brief-language">SHOW YOUR DRIVER</div>
          <h3 id="brief-name"></h3><p class="local-name" id="brief-local-name"></p><p class="brief-address" id="brief-address"></p>
          <div class="brief-actions"><button class="secondary-button" id="copy-brief" type="button">Copy arrival card</button><a id="source-link" target="_blank" rel="noreferrer">Verify office ↗</a></div>
          <p class="copy-status" id="copy-status" aria-live="polite"></p>
        </article>
      </div>
    </section>
    <section class="directory"><div><p class="eyebrow">The network</p><h2>One directory.<br>Every journey.</h2></div><p>Locations are sourced from official Swire, Swire Properties, Swire Pacific, Swire Coca-Cola, HAECO, Swire Water, Finlays, Steamships Trading Company and US Cold Storage pages. Always confirm meeting details with your host before departure.</p></section>
  </main>
  <footer><span>Swire Routes</span><span>Prototype · Office data checked September 2026</span></footer>
`;

const destinationSelect = document.querySelector('#destination');
const originInput = document.querySelector('#origin');
const routeForm = document.querySelector('#route-form');
const results = document.querySelector('#results');
let currentPosition = null;
let activeOffice = null;
let clockTimer = null;

[...new Set(offices.map((office) => office.region))].forEach((group) => {
  const optgroup = document.createElement('optgroup');
  optgroup.label = group;
  offices.filter((office) => office.region === group).forEach((office) => {
    const option = document.createElement('option');
    option.value = office.id;
    option.textContent = `${office.city} — ${office.name}`;
    optgroup.append(option);
  });
  destinationSelect.append(optgroup);
});

function originValue() { return currentPosition ? `${currentPosition.latitude},${currentPosition.longitude}` : originInput.value.trim(); }

function mapLinks(office) {
  const start = encodeURIComponent(originValue());
  const destination = encodeURIComponent(office.address);
  if (office.country === 'China') {
    const query = encodeURIComponent(`${office.localName} ${office.localAddress}`);
    return [
      { label: 'Open in Amap', href: `https://uri.amap.com/search?keyword=${query}&city=${encodeURIComponent(office.city)}&src=swire-routes&callnative=0`, primary: true },
      { label: 'Open in Baidu Maps', href: `https://map.baidu.com/search/${query}`, primary: false }
    ];
  }
  return [
    { label: 'Google Maps', href: `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${destination}&travelmode=${office.mode}`, primary: true },
    { label: 'Apple Maps', href: `https://maps.apple.com/?saddr=${start}&daddr=${destination}&dirflg=${office.mode === 'driving' ? 'd' : 'r'}`, primary: false }
  ];
}

function getContext(office, origin) {
  const fromTungChung = /tung\s*chung|東涌/i.test(origin);
  const taxiSource = 'https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/taxi/details_of_taxi_operating_areas_/';
  if (office.id === 'haeco-hk' && fromTungChung) return `<div class="taxi-badge blue"><span></span>Blue Lantau taxi</div><h3>Take blue from Tung Chung</h3><p>Both Tung Chung and HAECO at Chek Lap Kok are inside the Lantau taxi operating area. A blue taxi is the most locally appropriate choice. Red urban taxis may also serve the airport area; green New Territories taxis are not the natural option for this trip.</p><a href="${taxiSource}" target="_blank" rel="noreferrer">Hong Kong Transport Department guidance ↗</a>`;
  if (office.id === 'haeco-hk') return `<div class="taxi-badge blue"><span></span>Lantau / airport journey</div><h3>Check your taxi colour</h3><p>Blue taxis operate on Lantau and Chek Lap Kok. Red taxis serve most of Hong Kong, including the airport. Green taxis serve specified New Territories areas and designated airport routes.</p><a href="${taxiSource}" target="_blank" rel="noreferrer">Official operating areas ↗</a>`;
  if (office.id === 'swire-cocacola-hk') return `<div class="taxi-badge green"><span></span>New Territories destination</div><h3>Red or green?</h3><p>A green taxi is suitable when your pickup is within its permitted New Territories area. From Hong Kong Island or Kowloon, take a red urban taxi directly to Siu Lek Yuen.</p><a href="${taxiSource}" target="_blank" rel="noreferrer">Official operating areas ↗</a>`;
  if (office.country === 'China') return `<div class="taxi-badge amber"><span></span>Mainland routing</div><h3>Use a local map provider</h3><p>Amap is recommended for live road and transit conditions in the Chinese Mainland, with Baidu Maps as an alternative. Copy the Chinese address below for your driver.</p>`;
  return `<div class="taxi-badge red"><span></span>Arrival ready</div><h3>Allow a meeting buffer</h3><p>Open the live route before departure and allow extra time for security, building reception and lift access. Confirm the precise entrance with your meeting host.</p>`;
}

function updateClock() {
  if (!activeOffice) return;
  document.querySelector('#local-time').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: activeOffice.timezone, hour: '2-digit', minute: '2-digit', weekday: 'short' }).format(new Date());
}

function showRoute(office) {
  activeOffice = office;
  const origin = originInput.value.trim();
  document.querySelector('#route-title').textContent = `${office.city}, ${office.country}`;
  document.querySelector('#route-origin').textContent = origin;
  document.querySelector('#route-destination').textContent = office.name;
  document.querySelector('#route-address').textContent = office.address;
  document.querySelector('#route-advice').innerHTML = `<strong>${office.mode === 'driving' ? 'Road route suggested' : 'Public transport suggested'}</strong><span>Open your preferred provider for live time, traffic and service information.</span>`;
  document.querySelector('#map-actions').innerHTML = mapLinks(office).map((link) => `<a class="map-button ${link.primary ? 'primary' : ''}" href="${link.href}" target="_blank" rel="noreferrer">${link.label} <span>↗</span></a>`).join('');
  document.querySelector('#context-content').innerHTML = getContext(office, origin);
  document.querySelector('#brief-name').textContent = office.name;
  document.querySelector('#brief-local-name').textContent = office.localName;
  document.querySelector('#brief-address').textContent = office.localAddress;
  document.querySelector('#source-link').href = office.source;
  results.hidden = false;
  clearInterval(clockTimer);
  updateClock();
  clockTimer = setInterval(updateClock, 30000);
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

routeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const office = offices.find((item) => item.id === destinationSelect.value);
  if (office) showRoute(office);
});

originInput.addEventListener('input', () => { currentPosition = null; });
document.querySelector('#locate').addEventListener('click', () => {
  const status = document.querySelector('#location-status');
  if (!navigator.geolocation) { status.textContent = 'Location sharing is not supported by this browser.'; return; }
  status.textContent = 'Requesting your location…';
  navigator.geolocation.getCurrentPosition((position) => {
    currentPosition = position.coords;
    originInput.value = 'Current location';
    status.textContent = 'Location shared for this route only.';
  }, () => { status.textContent = 'Location was not shared. Enter your starting point instead.'; }, { enableHighAccuracy: true, timeout: 10000 });
});

document.querySelector('#copy-brief').addEventListener('click', async () => {
  if (!activeOffice) return;
  const text = `${activeOffice.name}\n${activeOffice.localName}\n${activeOffice.localAddress}`;
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(text); status.textContent = 'Arrival card copied.'; }
  catch { status.textContent = 'Could not copy automatically. Select the address above.'; }
});
