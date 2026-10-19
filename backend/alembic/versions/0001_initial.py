"""Create TTKZ entities and atomic booking constraints."""
from alembic import op
import sqlalchemy as sa
revision = "0001"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table("halls", sa.Column("id", sa.Integer, primary_key=True), sa.Column("name", sa.String(120), nullable=False), sa.Column("city", sa.String(50), nullable=False), sa.Column("address", sa.String(240), nullable=False), sa.Column("description", sa.String(600), nullable=False), sa.Column("price", sa.Integer, nullable=False), sa.Column("facilities", sa.String(300), nullable=False), sa.CheckConstraint("price > 0", name="positive_hall_price"))
    op.create_index("ix_halls_city", "halls", ["city"])
    op.create_table("playing_tables", sa.Column("id", sa.Integer, primary_key=True), sa.Column("hall_id", sa.Integer, sa.ForeignKey("halls.id"), nullable=False), sa.Column("number", sa.Integer, nullable=False), sa.UniqueConstraint("hall_id", "number", name="unique_hall_table"))
    op.create_table("players", sa.Column("id", sa.Integer, primary_key=True), sa.Column("name", sa.String(60), nullable=False), sa.Column("city", sa.String(50), nullable=False), sa.Column("level", sa.String(20), nullable=False), sa.Column("preference", sa.String(80), nullable=False), sa.Column("bio", sa.String(240), nullable=False), sa.CheckConstraint("level IN ('Beginner', 'Intermediate', 'Advanced')", name="valid_player_level"))
    op.create_table("bookings", sa.Column("id", sa.Integer, primary_key=True), sa.Column("player_id", sa.Integer, sa.ForeignKey("players.id"), nullable=False), sa.Column("table_id", sa.Integer, sa.ForeignKey("playing_tables.id"), nullable=False), sa.Column("play_date", sa.Date, nullable=False), sa.Column("hour", sa.Integer, nullable=False), sa.Column("price", sa.Integer, nullable=False), sa.Column("status", sa.String(20), nullable=False, server_default="confirmed"), sa.CheckConstraint("hour >= 9 AND hour <= 20", name="booking_opening_hours"), sa.CheckConstraint("status IN ('confirmed', 'cancelled')", name="valid_booking_status"))
    op.create_index("ix_bookings_player_id", "bookings", ["player_id"])
    op.create_index("unique_active_table_slot", "bookings", ["table_id", "play_date", "hour"], unique=True, postgresql_where=sa.text("status = 'confirmed'"))
    op.create_table("invitations", sa.Column("id", sa.Integer, primary_key=True), sa.Column("sender_id", sa.Integer, sa.ForeignKey("players.id"), nullable=False), sa.Column("receiver_id", sa.Integer, sa.ForeignKey("players.id"), nullable=False), sa.UniqueConstraint("sender_id", "receiver_id", name="unique_player_invitation"), sa.CheckConstraint("sender_id <> receiver_id", name="no_self_invitation"))
    op.create_table("tournaments", sa.Column("id", sa.Integer, primary_key=True), sa.Column("name", sa.String(120), nullable=False), sa.Column("city", sa.String(50), nullable=False), sa.Column("venue", sa.String(120), nullable=False), sa.Column("event_date", sa.Date, nullable=False), sa.Column("level", sa.String(80), nullable=False), sa.Column("description", sa.String(600), nullable=False))

def downgrade():
    for table in ("tournaments", "invitations", "bookings", "players", "playing_tables", "halls"):
        op.drop_table(table)
