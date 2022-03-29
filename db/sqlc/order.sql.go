// Code generated by sqlc. DO NOT EDIT.
// source: order.sql

package db

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const createOrder = `-- name: CreateOrder :one
INSERT INTO
    orders (
        id,
        recieved_date,
        delivery_date,
        client_name,
        client_id,
        client_address,
        client_phone,
        client_email
    )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, created_at
`

type CreateOrderParams struct {
	ID            uuid.UUID `json:"id"`
	RecievedDate  time.Time `json:"recieved_date"`
	DeliveryDate  time.Time `json:"delivery_date"`
	ClientName    string    `json:"client_name"`
	ClientID      string    `json:"client_id"`
	ClientAddress string    `json:"client_address"`
	ClientPhone   string    `json:"client_phone"`
	ClientEmail   string    `json:"client_email"`
}

func (q *Queries) CreateOrder(ctx context.Context, arg CreateOrderParams) (Order, error) {
	row := q.db.QueryRowContext(ctx, createOrder,
		arg.ID,
		arg.RecievedDate,
		arg.DeliveryDate,
		arg.ClientName,
		arg.ClientID,
		arg.ClientAddress,
		arg.ClientPhone,
		arg.ClientEmail,
	)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.CreatedAt,
	)
	return i, err
}

const deleteOrder = `-- name: DeleteOrder :exec
DELETE
FROM
    orders
WHERE id = $1
`

func (q *Queries) DeleteOrder(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.ExecContext(ctx, deleteOrder, id)
	return err
}

const getNextOrderIdentifier = `-- name: GetNextOrderIdentifier :one
SELECT
    identifier + 1
FROM
    orders
ORDER BY
    identifier
DESC
LIMIT 1
`

func (q *Queries) GetNextOrderIdentifier(ctx context.Context) (int32, error) {
	row := q.db.QueryRowContext(ctx, getNextOrderIdentifier)
	var column_1 int32
	err := row.Scan(&column_1)
	return column_1, err
}

const getOrder = `-- name: GetOrder :one
SELECT
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, created_at
FROM
    orders
WHERE
    id = $1
LIMIT
    1
`

func (q *Queries) GetOrder(ctx context.Context, id uuid.UUID) (Order, error) {
	row := q.db.QueryRowContext(ctx, getOrder, id)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.CreatedAt,
	)
	return i, err
}

const listOrders = `-- name: ListOrders :many
SELECT
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, created_at
FROM
    orders
ORDER BY
    name
LIMIT
    $1 OFFSET $2
`

type ListOrdersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListOrders(ctx context.Context, arg ListOrdersParams) ([]Order, error) {
	rows, err := q.db.QueryContext(ctx, listOrders, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.ID,
			&i.Identifier,
			&i.RecievedDate,
			&i.DeliveryDate,
			&i.ClientName,
			&i.ClientID,
			&i.ClientAddress,
			&i.ClientPhone,
			&i.ClientEmail,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateOrder = `-- name: UpdateOrder :one
UPDATE
    orders
SET
    client_name = $2,
    client_id = $3,
    client_address = $4,
    client_phone = $5,
    client_email = $6,
    recieved_date = $7,
    delivery_date = $8
WHERE
    id = $1
RETURNING id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, created_at
`

type UpdateOrderParams struct {
	ID            uuid.UUID `json:"id"`
	ClientName    string    `json:"client_name"`
	ClientID      string    `json:"client_id"`
	ClientAddress string    `json:"client_address"`
	ClientPhone   string    `json:"client_phone"`
	ClientEmail   string    `json:"client_email"`
	RecievedDate  time.Time `json:"recieved_date"`
	DeliveryDate  time.Time `json:"delivery_date"`
}

func (q *Queries) UpdateOrder(ctx context.Context, arg UpdateOrderParams) (Order, error) {
	row := q.db.QueryRowContext(ctx, updateOrder,
		arg.ID,
		arg.ClientName,
		arg.ClientID,
		arg.ClientAddress,
		arg.ClientPhone,
		arg.ClientEmail,
		arg.RecievedDate,
		arg.DeliveryDate,
	)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.CreatedAt,
	)
	return i, err
}
