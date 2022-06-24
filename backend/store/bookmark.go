package store

import (
	"fmt"
	"sha/backend/api"
	"sha/backend/common"
	"strings"
)

func (s *Store) CreateBookmark(create *api.BookmarkCreate) (*api.Bookmark, error) {
	bookmark, err := createBookmark(s.db, create)
	if err != nil {
		return nil, err
	}

	return bookmark, nil
}

func (s *Store) DeleteBookmark(delete *api.BookmarkDelete) error {
	err := deleteBookmark(s.db, delete)
	if err != nil {
		return FormatError(err)
	}

	return nil
}

func (s *Store) PatchBookmark(patch *api.BookmarkPatch) (*api.Bookmark, error) {
	bookmark, err := patchBookmark(s.db, patch)
	if err != nil {
		return nil, err
	}

	return bookmark, nil
}

func (s *Store) FindBookmarkList(find *api.BookmarkFind) ([]*api.Bookmark, error) {
	list, err := findBookmarkList(s.db, find)
	if err != nil {
		return nil, err
	}

	return list, nil
}

func (s *Store) FindBookmark(find *api.BookmarkFind) (*api.Bookmark, error) {
	list, err := findBookmarkList(s.db, find)
	if err != nil {
		return nil, err
	}

	if len(list) == 0 {
		return nil, nil
	} else if len(list) > 1 {
		return nil, &common.Error{Code: common.Conflict, Err: fmt.Errorf("found %d bookmark list with filter %+v, expect 1. ", len(list), find)}
	}

	return list[0], nil
}

func createBookmark(db *DB, create *api.BookmarkCreate) (*api.Bookmark, error) {
	row, err := db.Db.Query(`
		INSERT INTO bookmark (
			link,
			title,
			description,
			author,
			publisher,
			image,
			logo,
			tag
		)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		RETURNING id, link, title, description, author, publisher, image, logo, tag, created_ts, updated_ts
	`,
		create.Link,
		create.Title,
		create.Description,
		create.Author,
		create.Publisher,
		create.Image,
		create.Logo,
		create.Tag,
	)
	if err != nil {
		return nil, FormatError(err)
	}
	defer row.Close()

	row.Next()
	var bookmark api.Bookmark
	if err := row.Scan(
		&bookmark.ID,
		&bookmark.Link,
		&bookmark.Title,
		&bookmark.Description,
		&bookmark.Author,
		&bookmark.Publisher,
		&bookmark.Image,
		&bookmark.Logo,
		&bookmark.Tag,
		&bookmark.CreatedTs,
		&bookmark.UpdatedTs,
	); err != nil {
		return nil, FormatError(err)
	}

	return &bookmark, nil
}

func deleteBookmark(db *DB, delete *api.BookmarkDelete) error {
	result, err := db.Db.Exec(`DELETE FROM bookmark WHERE id = ?`, delete.ID)
	if err != nil {
		return FormatError(err)
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return &common.Error{Code: common.NotFound, Err: fmt.Errorf("Bookmark ID not found: %d", delete.ID)}
	}

	return nil
}

func patchBookmark(db *DB, patch *api.BookmarkPatch) (*api.Bookmark, error) {
	set, args := []string{}, []interface{}{}

	if v := patch.Link; v != nil {
		set, args = append(set, "link = ?"), append(args, v)
	}
	if v := patch.Title; v != nil {
		set, args = append(set, "title = ?"), append(args, v)
	}
	if v := patch.Description; v != nil {
		set, args = append(set, "description = ?"), append(args, *v)
	}
	args = append(args, patch.ID)

	row, err := db.Db.Query(`
		UPDATE bookmark
		SET `+strings.Join(set, ", ")+`
		WHERE id = ?
		RETURNING id, link, title, description, publisher, image, logo, tag, created_ts, updated_ts
	`, args...)
	if err != nil {
		return nil, FormatError(err)
	}
	defer row.Close()

	if row.Next() {
		var bookmark api.Bookmark
		if err := row.Scan(
			&bookmark.ID,
			&bookmark.Link,
			&bookmark.Title,
			&bookmark.Description,
			&bookmark.Author,
			&bookmark.Publisher,
			&bookmark.Image,
			&bookmark.Logo,
			&bookmark.Tag,
			&bookmark.CreatedTs,
			&bookmark.UpdatedTs,
		); err != nil {
			return nil, FormatError(err)
		}

		return &bookmark, nil
	}

	return nil, &common.Error{Code: common.NotFound, Err: fmt.Errorf("bookmark ID not found: %d", patch.ID)}
}

func findBookmarkList(db *DB, find *api.BookmarkFind) ([]*api.Bookmark, error) {
	where, args := []string{"1 = 1"}, []interface{}{}

	if v := find.ID; v != nil {
		where, args = append(where, "id = ?"), append(args, *v)
	}
	if v := find.Link; v != nil {
		where, args = append(where, "link = ?"), append(args, *v)
	}
	if v := find.Title; v != nil {
		where, args = append(where, "title = ?"), append(args, *v)
	}
	if v := find.Description; v != nil {
		where, args = append(where, "description = ?"), append(args, *v)
	}

	rows, err := db.Db.Query(`
		SELECT 
			id,
			link,
			title,
			description,
			author,
			publisher,
			image,
			logo,
			tag,
			created_ts,
			updated_ts
		FROM bookmark
		WHERE `+strings.Join(where, " AND "),
		args...,
	)
	if err != nil {
		return nil, FormatError(err)
	}
	defer rows.Close()

	list := make([]*api.Bookmark, 0)
	for rows.Next() {
		var bookmark api.Bookmark
		if err := rows.Scan(
			&bookmark.ID,
			&bookmark.Link,
			&bookmark.Title,
			&bookmark.Description,
			&bookmark.Author,
			&bookmark.Publisher,
			&bookmark.Image,
			&bookmark.Logo,
			&bookmark.Tag,
			&bookmark.CreatedTs,
			&bookmark.UpdatedTs,
		); err != nil {
			fmt.Println(err)
			return nil, FormatError(err)
		}

		list = append(list, &bookmark)
	}

	if err := rows.Err(); err != nil {
		return nil, FormatError(err)
	}

	return list, nil
}
