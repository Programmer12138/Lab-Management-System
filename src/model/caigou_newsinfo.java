package model;

//本模型层用于描述采购新闻
public class caigou_newsinfo {
    //一条采购新闻包含3个成员变量，分别是“信息”“编号”“时间”
    String message;
    int news_id;
    String news_time;

    String get_message() {
        return message;
    }

    public void set_message(String message) {
        this.message = message;
    }

    int get_news_id() {
        return news_id;
    }

    public void set_news_id(int news_id) {
        this.news_id = news_id;
    }

    String get_news_time() {
        return news_time;
    }

    public void set_news_time(String news_time) {
        this.news_time = news_time;
    }
}
