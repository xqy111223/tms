const utils = {
    toChinese : function(number){
        switch (number) {
            case 1 :
                return '一';
            case 2 :
                return '二';
            case 3 :
                return '三';
            case 4 :
                return '四';
            case 5 :
                return '五';
            case 6 :
                return '六';
            case 7 :
                return '七';
            case 8 :
                return '八';
            case 9 :
                return '九';
            case 10 :
                return '十';
            case 11 :
                return '十一';
            case 12 :
                return '十二';
            case 13 :
                return '十三';
            case 14 :
                return '十四';
            case 15 :
                return '十五';
            case 16 :
                return '十六';
            case 17 :
                return '十七';
            case 18 :
                return '十八';
            case 19 :
                return '十九';
            case 20 :
                return '二十';
            default:
                return '';
        }
    }

}

export default utils 