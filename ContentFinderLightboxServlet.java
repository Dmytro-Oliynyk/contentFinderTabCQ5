package com.myapp.services.servlet;

import com.day.cq.commons.TidyJSONWriter;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;

import javax.imageio.ImageIO;
import javax.jcr.Node;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Component(label = "Lightbox Servlet", name = "com.myapp.services.servlet.ContentFinderLightbox", metatype = true, immediate = true)
@Service(value = {Servlet.class})
@Properties({
        @Property(name = "sling.servlet.methods", value = "GET"),
        @Property(name = "sling.servlet.paths", value = {"/bin/wcm/contentfinder/mydamsearch/view"}),
        @Property(name = "sling.servlet.extensions", value = {"json"}),
})
public class ContentFinderLightboxServlet extends SlingSafeMethodsServlet {

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {


        String wp = "{" +
                "            \"path\": \"http://blog.room34.com/wp-content/uploads/underdog/logo.thumbnail.png\",\n" +
                "            \"name\": \"wp\",\n" +
                "            \"mimeType\": \"image/jpeg\",\n" +
                "            \"lastModified\": 1442834708045,\n" +
                "            \"excerpt\": \"\",\n" +
                "            \"msm:isLiveCopy\": false,\n" +
                "            \"msm:isInBlueprint\": false,\n" +
                "            \"msm:isSource\": false,\n" +
                "             \"ddGroups\": [\"myDam\"],\n" +
                "            \"templateParams\": null,\n" +
                "            \"imageWidth\": null,\n" +
                "            \"imageHeight\": null\n" +
                "        },\n";
        String fasebookJson = "{ " +
                "            \"path\": \"http://www.wku.edu/ogden/images/facebook_thumbnail.jpg\",\n" +
                "            \"name\": \"facebook\",\n" +
                "            \"mimeType\": \"image/jpeg\",\n" +
                "            \"lastModified\": 1442834708045,\n" +
                "            \"excerpt\": \"\",\n" +
                "            \"msm:isLiveCopy\": false,\n" +
                "            \"msm:isInBlueprint\": false,\n" +
                "            \"msm:isSource\": false,\n" +
                "             \"ddGroups\": [\"myDam\"],\n" +
                "            \"templateParams\": null,\n" +
                "            \"imageWidth\": null,\n" +
                "            \"imageHeight\": null\n" +
                "        },\n";


        String query = request.getParameter("query");

        if (query != null) {
            if (query.equalsIgnoreCase("fasebook")) {
                response.getWriter().write("{hits: [" + fasebookJson + " ]}");
            } else if (query.equalsIgnoreCase("wp")) {
                response.getWriter().write("{hits: [" + wp + " ]}");
            } else {
                response.getWriter().write("{\"hits\": [" + fasebookJson + wp + " ]}");
            }
        } else {
            response.getWriter().write("{\"hits\": [" + fasebookJson + wp + " ]}");
        }
    }


}