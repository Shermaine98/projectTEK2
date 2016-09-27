/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao.forums;

import db.DBConnectionFactory;
import model.forums.Forums;
import static db.DBConnectionFactory.getInstance;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import static java.util.logging.Level.SEVERE;
import static java.util.logging.Logger.getLogger;

/**
 *
 * @author Shermaine
 */
public class DaoForum {

    public boolean addForum(Forums forum) {
        try {
            DBConnectionFactory myFactory = getInstance();
            int rows;
            try (Connection conn = myFactory.getConnection()) {
                String query = "INSERT INTO FORUMS (forumTitle, createdBy, body, reportCount) VALUES (?,?,?,?) ";
                PreparedStatement pstmt = conn.prepareStatement(query);

                pstmt.setString(1, forum.getForumTitle());
                pstmt.setInt(2, forum.getCreatedBy());
                pstmt.setString(3, forum.getBody());
                pstmt.setInt(4, forum.getReportCount());

                rows = pstmt.executeUpdate();
            }
            return rows == 1;
        } catch (SQLException ex) {
            getLogger(DaoForum.class.getName()).log(SEVERE, null, ex);
        }
        return false;
    }

    public ArrayList<Forums> getComments(int forumID) throws ParseException {
        ArrayList<Forums> arrForums = new ArrayList<Forums>();

        try {
            DBConnectionFactory myFactory = getInstance();
            try (Connection conn = myFactory.getConnection()) {
                PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM FORUMS");
                pstmt.setInt(1, forumID);

                ResultSet rs = pstmt.executeQuery();
                while (rs.next()) {
                    Forums forums = new Forums();
                    forums.setForumID(rs.getInt("forumID"));
                    forums.setCreatedBy(rs.getInt("createdBy"));
                    forums.setBody(rs.getString("body"));
                    forums.setReportCount(rs.getInt("reportCount"));
                    forums.setDateCreated(rs.getDate("dateCreated"));
                    arrForums.add(forums);

                }

                pstmt.close();
                rs.close();
            }

            return arrForums;
        } catch (SQLException ex) {
            getLogger(DaoForum.class.getName()).log(SEVERE, null, ex);
        }
        return null;
    }

}
