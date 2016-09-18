package servlets.demo.access;

import dao.demo.HighestCompletedDAO;
import dao.demo.MaritalStatusDAO;
import dao.demo.ByAgeGroupSexDAO;
import dao.RecordDAO;
import model.GlobalRecords;
import model.Record;
import servlets.servlet.BaseServlet;
import servlets.demo.ApproveDemoServlet;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import static java.util.logging.Level.SEVERE;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static java.util.logging.Logger.getLogger;

/**
 *
 * @author Atayan
 * @author Roxas
 * @author Sy
 *
 */
public class RetrieveDataDemoServlet extends BaseServlet {

    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void servletAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String redirect = request.getParameter("redirect");
        String saveToDb = (String) request.getAttribute("saveToDB");
        RequestDispatcher rd = null;
        recordDAO recordDAO = new recordDAO();

        //Demo Aid       
        if (redirect.equalsIgnoreCase("byAgeGroupSex")) {
            byAgeGroupSexDAO byAgeGroupSexDAO = new byAgeGroupSexDAO();
            ArrayList<globalRecords> ErrRecords = new ArrayList<>();
            ArrayList<record> records = new ArrayList<>();
            try {
                ErrRecords = byAgeGroupSexDAO.getValidationFalse();
                records = recordDAO.GetForApproval(200000000, 299999999);
            } catch (ParseException | SQLException ex) {
                getLogger(RetrieveDataDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            if (saveToDb != null) {
                request.setAttribute("saveToDB", saveToDb);
                request.setAttribute("page", "byAgeGroupSex");
            } else {
                request.setAttribute("saveToDB", "none");
                request.setAttribute("page", "byAgeGroupSex");
            }
            request.setAttribute("validatedRecords", records);
            request.setAttribute("IncompleteRecords", ErrRecords);
            rd = request.getRequestDispatcher("/WEB-INF/JSPDemo/byAgeGroupSex.jsp");
            rd.forward(request, response);
        } else if (redirect.equalsIgnoreCase("MaritalStatus")) {
            MaritalStatusDAO maritalStatus = new MaritalStatusDAO();
            ArrayList<globalRecords> ErrRecords = new ArrayList<>();
            ArrayList<record> records = new ArrayList<>();
            try {
                ErrRecords = maritalStatus.getNullCountMarital();
                records = recordDAO.GetForApproval(300000000, 399999999);
            } catch (ParseException | SQLException ex) {
                getLogger(RetrieveDataDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            if (saveToDb != null) {
                request.setAttribute("saveToDB", saveToDb);
                request.setAttribute("page", "MaritalStatus");
            } else {
                request.setAttribute("saveToDB", "none");
                request.setAttribute("page", "MaritalStatus");
            }
            request.setAttribute("IncompleteRecords", ErrRecords);
            request.setAttribute("validatedRecords", records);
            rd = request.getRequestDispatcher("/WEB-INF/JSPDemo/maritalStatus.jsp");
            rd.forward(request, response);
        } else if (redirect.equalsIgnoreCase("HighestCompleted")) {
            HighestCompletedDAO highestCompletedDAO = new HighestCompletedDAO();
            ArrayList<globalRecords> ErrRecords = new ArrayList<>();
            ArrayList<record> records = new ArrayList<>();
            try {
                ErrRecords = highestCompletedDAO.getNullCountHighest();
                records = recordDAO.GetForApproval(400000000, 499999999);
            } catch (ParseException | SQLException ex) {
                getLogger(RetrieveDataDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            if (saveToDb != null) {
                request.setAttribute("saveToDB", saveToDb);
                request.setAttribute("page", "HighestCompleted");
            } else {
                request.setAttribute("saveToDB", "none");
                request.setAttribute("page", "HighestCompleted");
            }
            request.setAttribute("IncompleteRecords", ErrRecords);
            request.setAttribute("validatedRecords", records);
            rd = request.getRequestDispatcher("/WEB-INF/JSPDemo/highestCompleted.jsp");
            rd.forward(request, response);
        } //DEMO  head    
        else if (redirect.equalsIgnoreCase("demographics_approval")) {
            ArrayList<record> recordsAge = new ArrayList<>();
            ArrayList<record> recordsMarital = new ArrayList<>();
            ArrayList<record> recordsHighest = new ArrayList<>();
            //AGE GROUP APPRVOVAL
            try {
                recordsAge = recordDAO.GetForApproval(200000000, 299999999);
            } catch (ParseException ex) {
                getLogger(ApproveDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            //MARITAL GROUP APPRVOVAL
            try {
                recordsMarital = recordDAO.GetForApproval(300000000, 399999999);
            } catch (ParseException ex) {
                getLogger(ApproveDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            //Highest GROUP APPRVOVAL
            try {
                recordsHighest = recordDAO.GetForApproval(400000000, 499999999);
            } catch (ParseException ex) {
                getLogger(ApproveDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            request.setAttribute("page", "approvalAdmin");
            request.setAttribute("message", "none");
            request.setAttribute("age", recordsAge);
            request.setAttribute("marital", recordsMarital);
            request.setAttribute("highest", recordsHighest);
            request.setAttribute("subject", "");
            rd = request.getRequestDispatcher("/WEB-INF/JSPApproval/demographics.jsp");
            rd.forward(request, response);
        } else if (redirect.contains("approval_")) {
            if (redirect.equalsIgnoreCase("approval_agegroup")) {
                request.setAttribute("subject", "AgeGroup");
            } else if (redirect.equalsIgnoreCase("approval_highestcompleted")) {
                request.setAttribute("subject", "highest");
            } else if (redirect.equalsIgnoreCase("approval_maritalstatus")) {
                request.setAttribute("subject", "marital");
            }

            ArrayList<record> recordsAge = new ArrayList<>();
            ArrayList<record> recordsMarital = new ArrayList<>();
            ArrayList<record> recordsHighest = new ArrayList<>();
            //AGE GROUP APPRVOVAL
            try {
                recordsAge = recordDAO.GetForApproval(200000000, 299999999);
            } catch (ParseException ex) {
                getLogger(ApproveDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            //MARITAL GROUP APPRVOVAL
            try {
                recordsMarital = recordDAO.GetForApproval(300000000, 399999999);
            } catch (ParseException ex) {
                getLogger(ApproveDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            //Highest GROUP APPRVOVAL
            try {
                recordsHighest = recordDAO.GetForApproval(400000000, 499999999);
            } catch (ParseException ex) {
                getLogger(ApproveDemoServlet.class.getName()).log(SEVERE, null, ex);
            }
            request.setAttribute("page", "approvalAdmin");
            request.setAttribute("message", "none");
            request.setAttribute("age", recordsAge);
            request.setAttribute("marital", recordsMarital);
            request.setAttribute("highest", recordsHighest);
            rd = request.getRequestDispatcher("/WEB-INF/JSPApproval/demographics.jsp");
            rd.forward(request, response);

        } else {
            request.setAttribute("page", "error");
            rd = request.getRequestDispatcher("/WEB-INF/redirect_error.jsp");
            rd.forward(request, response);

        }

    }
}
