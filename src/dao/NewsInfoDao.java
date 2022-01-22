package dao;

import model.BaoXiuInfo;
import model.BuyInfo;
import model.baoxiu_newsinfo;
import model.caigou_newsinfo;
import util.DbcpUtils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class NewsInfoDao {

    static double getsunhuailv(Connection conn, String college_no)
            throws SQLException {
        //该函数的作用是求出某个学院器材的损坏率
        int sunhuaishu = 0;// 损坏器材的数目
        int zongshu = 0;// 器材总数
        double sunhuailv;//损坏率
        //求出损坏器材数目
        String sql = "select count(distinct equipment.equip_id) as sunhuaishu "
                + "from BaoXiu,equipment,teacher "
                + "where equipment.tno=teacher.tno and "
                + "BaoXiu.equip_id=equipment.equip_id and "
                + "teacher.college_no=" + college_no;
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next() == true) {
            sunhuaishu = rs.getInt("sunhuaishu");
        }
        // 求出总器材数目
        sql = "select count(*) as zongshu " + "from equipment,teacher "
                + "where equipment.tno=teacher.tno and " + "teacher.college_no="
                + college_no;
        rs = st.executeQuery(sql);
        while (rs.next() == true) {
            zongshu = rs.getInt("zongshu");
        }
        //求出损坏率
        sunhuailv = (double) sunhuaishu / (double) zongshu;
        return sunhuailv;
    }

    static String coll_tuisong(Connection conn, String college_no)
            throws SQLException {
        //本方法求出给学院推送的信息
        double shl;// shl是损坏率
        //求出某个学院的损坏率
        shl = getsunhuailv(conn, college_no);// 姹傚嚭璇ラ櫌鐨勫櫒鏉愭崯鍧忕巼
        String coll_name = null;
        // 根据学院编号求出学院名称
        if (college_no.equals("1"))
            coll_name = "机电学院";
        if (college_no.equals("2"))
            coll_name = "物联网学院";
        if (college_no.equals("3"))
            coll_name = "商学院";
        // 根据损坏率的不同推送不同消息
        if (shl < 0.05)
            return coll_name + "的损坏率是" + getsunhuailv(conn, college_no)
                    + "器材使用情况良好";
        if (shl >= 0.05 && shl < 0.15)
            return coll_name + "的损坏率是" + getsunhuailv(conn, college_no)
                    + "注意及时维修";
        if (shl >= 0.15)
            return coll_name + "的损坏率是" + getsunhuailv(conn, college_no)
                    + "请及时购买";
        return coll_name + "没有损坏器材";
    }

    static String count_total_consumption(Connection conn, String college_no)
            throws SQLException {
        //本方法求出某个学院一年度的总消费
        String coll_name = null;
        //根据学院编号求出名称
        if (college_no.equals("1"))
            coll_name = "机电学院";
        if (college_no.equals("2"))
            coll_name = "物联网学院";
        if (college_no.equals("3"))
            coll_name = "商学院";
        //求出总消费
        double total_consumption = 0;
        String sql = "select SUM(money) as sum_money " + "from buy "
                + "where college_no=" + college_no;
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next() == true) {
            total_consumption = rs.getDouble("sum_money");
        }
        return "本年度" + coll_name + "在器材购买上消费" + total_consumption + "元";
    }

    static BaoXiuInfo[] show_baoxiu(Connection conn) throws SQLException {
        //本方法返回数据库中的报修表的信息
        //求出数组长度，长度等于报修表的长度
        int length = 0;
        String sql = "select count(*) as total_num from BaoXiu";
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next() == true) {
            length = rs.getInt("total_num");
        }
        //从数据库中读出报修信息
        sql = "select *  " + "from BaoXiu,student,equipment,place "
                + "where BaoXiu.equip_id=equipment.equip_id and "
                + "baoxiu.sno=student.sno and "
                + "equipment.place_id=place.place_id";
        rs = st.executeQuery(sql);
        BaoXiuInfo bx[];
        bx = new BaoXiuInfo[length];
        int i = 0;
        while (rs.next() == true) {
            bx[i] = new BaoXiuInfo();
            //把从数据库读出来的信息传给对象
            bx[i].setEquipId(rs.getString("equip_id"));
            bx[i].setSname(rs.getString("sname"));
            bx[i].setSno(rs.getString("sno"));
            bx[i].setBaoXiuDate(rs.getString("time"));
            bx[i].setStatus(rs.getString("status"));
            //字符串拼接求出具体地点
            bx[i].setLocation(rs.getString("building") + rs.getString("room")
                    + rs.getString("rname"));
            bx[i].setEquipName(rs.getString("equip_name"));
            if (i < length)
                i++;
        }
        return bx;
    }

    // 本方法返回“报修新闻”数组
    public baoxiu_newsinfo[] findall_baoxiu_news()
            throws ClassNotFoundException, SQLException {
        //建立数据库连接
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        conn = DbcpUtils.getConnection();
        System.out.println("connect successfully");
        BaoXiuInfo[] bx = show_baoxiu(conn);
        baoxiu_newsinfo[] bni = new baoxiu_newsinfo[bx.length];
        //生成“报修新闻”数组
        for (int i = 0; i < show_baoxiu(conn).length; i++) {
            bni[i] = new baoxiu_newsinfo();
            bni[i].set_news_id(i);
            //字符串拼接求出最终的报修信息字符串
            bni[i].set_message(bx[i].getSname() + "在" + bx[i].getBaoXiuDate()
                    + "报修了" + bx[i].getEquipName() + ",该器材编号是"
                    + bx[i].getEquipId() + ",该器材位于" + bx[i].getLocation());
            bni[i].set_news_time(bx[i].getBaoXiuDate());
        }
        return bni;
    }

    // 本方法从数据库中读出“购买信息”
    static BuyInfo[] show_buy(Connection conn) throws SQLException {
        //求出数组长度
        int length = 0;
        String sql = "select count(*) as total_num from buy";
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next() == true) {
            length = rs.getInt("total_num");
        }
        //sql语句的意思是读出所有的购买信息
        sql = "select * from buy,producer,college "
                + "where buy.college_no=college.college_no and "
                + "buy.producer_no=producer.producer_no";
        rs = st.executeQuery(sql);
        BuyInfo bi[];
        bi = new BuyInfo[length];
        int i = 0;
        while (rs.next() == true) {
            bi[i] = new BuyInfo();
            //把从数据库里读出的信息传给对象
            bi[i].setBuyId(rs.getString("Buy_Id"));
            bi[i].setBuyer(rs.getString("college_name"));
            bi[i].setSeller(rs.getString("producer_name"));
            bi[i].setBuyDate(rs.getString("buy_time"));
            bi[i].setBuyNum(rs.getInt("buy_num"));
            bi[i].setEquipName(rs.getString("equip_name"));
            if (i < length)
                i++;
        }
        return bi;
    }

    // 本方法返回“采购新闻”的数组
    public caigou_newsinfo[] findall_caigou_news()
            throws ClassNotFoundException, SQLException {
        //建立数据库连接
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        conn = DbcpUtils.getConnection();
        System.out.println("connect successfully");
        BuyInfo[] bi = show_buy(conn);
        caigou_newsinfo[] cni = new caigou_newsinfo[bi.length];
        for (int i = 0; i < bi.length; i++) {
            cni[i] = new caigou_newsinfo();
            cni[i].set_news_id(i);
            //通过字符串的拼接，求出最终的信息
            cni[i].set_message(bi[i].getBuyer() + "在" + bi[i].getBuyDate() + "从"
                    + bi[i].getSeller() + "处购买了" + bi[i].getEquipName());
            cni[i].set_news_time(bi[i].getBuyDate());
        }
        return cni;
    }

}
