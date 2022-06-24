package api

type Bookmark struct {
	ID int `json:"id"`

	// Standard fields
	CreatedTs int64 `json:"createdTs"`
	UpdatedTs int64 `json:"updatedTs"`

	// Domain specific fields
	Link						string `json:"link"`
	Title						string `json:"title"`
	Description			string `json:"description"`
	Author					string `json:"author"`
	Publisher				string `json:"publisher"`
	Image						string `json:"image"`
	Logo						string `json:"logo"`
	Tag							string `json:"tag"`
}

type BookmarkCreate struct {
	// Domain specific fields
	Link						string `json:"link"`
	Title						string `json:"title"`
	Description			string `json:"description"`
	Author					string `json:"author"`
	Publisher				*string `json:"publisher"`
	Image						string `json:"image"`
	Logo						*string `json:"logo"`
	Tag							*string `json:"tag"`
}

type BookmarkDelete struct {
	ID int `json:"id"`
}

type BookmarkPatch struct {
	ID int

	// Domain specific fields
	Link						*string `json:"link"`
	Title						*string `json:"title"`
	Description			*string `json:"description"`
	Author					*string `json:"author"`
	Publisher				*string `json:"publisher"`
	Image						*string `json:"image"`
	Logo						*string `json:"logo"`
	Tag							*string `json:"tag"`
}

type BookmarkFind struct {
	ID *int `json:"id"`

	// Domain specific fields
	Link						*string `json:"link"`
	Title						*string `json:"title"`
	Description			*string `json:"description"`
	Author					*string `json:"author"`
	Publisher				*string `json:"publisher"`
	Tag							*string `json:"tag"`
}
