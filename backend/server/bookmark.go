package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sha/backend/api"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (s *Server) registerBookmarkRoutes(g *echo.Group) {
	g.POST("/bookmark", func(c echo.Context) error {
		bookmarkCreate := &api.BookmarkCreate{}
		if err := json.NewDecoder(c.Request().Body).Decode(bookmarkCreate); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Malformatted post bookmark request").SetInternal(err)
		}

		bookmark, err := s.Store.CreateBookmark(bookmarkCreate)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create bookmark").SetInternal(err)
		}

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		if err := json.NewEncoder(c.Response().Writer).Encode(composeResponse(bookmark)); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to encode bookmark response").SetInternal(err)
		}

		return nil
	})

	g.GET("/bookmark", func(c echo.Context) error {
		bookmarkList, err := s.Store.FindBookmarkList(&api.BookmarkFind{})
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to fetch bookmark list").SetInternal(err)
		}

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		if err := json.NewEncoder(c.Response().Writer).Encode(composeResponse(bookmarkList)); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to encode bookmark list response").SetInternal(err)
		}

		return nil
	})

	g.GET("/bookmark/:id", func(c echo.Context) error {
		bookmarkID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("ID is not a number: %s", c.Param("id"))).SetInternal(err)
		}

		bookmarkFind := &api.BookmarkFind{
			ID: &bookmarkID,
		}
		bookmark, err := s.Store.FindBookmark(bookmarkFind)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to fetch bookmark").SetInternal(err)
		}

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		if err := json.NewEncoder(c.Response().Writer).Encode(composeResponse(bookmark)); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to encode bookmark response").SetInternal(err)
		}

		return nil
	})

	g.PATCH("/bookmark/:id", func(c echo.Context) error {
		bookmarkID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("ID is not a number: %s", c.Param("id"))).SetInternal(err)
		}

		bookmarkPatch := &api.BookmarkPatch{
			ID: bookmarkID,
		}
		if err := json.NewDecoder(c.Request().Body).Decode(bookmarkPatch); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Malformatted patch bookmark request").SetInternal(err)
		}

		bookmark, err := s.Store.PatchBookmark(bookmarkPatch)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to patch bookmark").SetInternal(err)
		}

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
		if err := json.NewEncoder(c.Response().Writer).Encode(composeResponse(bookmark)); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to encode bookmark response").SetInternal(err)
		}

		return nil
	})

	g.DELETE("/bookmark/:bookmarkId", func(c echo.Context) error {
		bookmarkID, err := strconv.Atoi(c.Param("bookmarkId"))
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("ID is not a number: %s", c.Param("bookmarkId"))).SetInternal(err)
		}

		bookmarkDelete := &api.BookmarkDelete{
			ID: bookmarkID,
		}

		err = s.Store.DeleteBookmark(bookmarkDelete)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, fmt.Sprintf("Failed to delete bookmark ID: %v", bookmarkID)).SetInternal(err)
		}

		c.JSON(http.StatusOK, true)

		return nil
	})
}
