using System.ComponentModel.DataAnnotations.Schema;

namespace PregnantWeb.Models
{
    [Table("payment_links")]
    public class PayLinks
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("product_id")]
        public string ProductId { get; set; }

        [Column("payment_url")]
        public string PaymentUrl { get; set; }
    }
}
